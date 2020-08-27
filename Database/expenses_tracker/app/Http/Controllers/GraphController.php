<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GraphController extends Controller
{
    //

    /**
     *
     * Graph API (for Victory library) - getCategoriesPie, getOverviewGraph
     *
     */

    function getCategoriesPie(Request $request)
    {
        $this->validate($request, [
            'month' => 'required',
            'year' => 'required',
        ]);

        $user_id = auth()->user()->id;
        $data = Transaction::join('categories', 'category_id', '=', 'categories.id')
            ->select(Transaction::raw('categories.id, categories.category_title, SUM(transactions.amount) as catTotal, categories.color'))
            ->where('transactions.user_id', '=', $user_id)
            ->whereMonth('transactions.date', $request->month)
            ->whereYear('transactions.date', $request->year)
            ->groupBy('categories.id')
            ->get();

        if ($data->isEmpty()) {
            return response()->json([
                'status' => 'success_empty',
                'pieData' => $data,
            ]);
        }

        $pieData = [];
        $colorData = [];
        foreach ($data as $cat) {
            $currCat = [
                'x' => $cat->id,
                'y' => (float)$cat->catTotal,
                'label' => $cat->category_title
            ];

            $pieData[] = $currCat;
            $colorData[] = $cat->color;
        }

        return response()->json([
            'status' => 'success',
            'pieData' => $pieData,
            'colorData' => $colorData,
        ]);
    }

    function getOverviewData(Request $request)
    {

        $period = Carbon::now();
        if ($request->month && $request->year) {
            $period = Carbon::createFromDate($request->year, $request->month);
        }

        $user_id = auth()->user()->id;

        $budgets = Categories::select('budget')->where('user_id', $user_id)->get();
        $startOfMonth = $period->copy()->startOfMonth();
        $endOfMonth = $period->copy()->endOfMonth();
        $totalBudget = 0;

        foreach ($budgets as $cat) {

            if (array_key_exists($period->format('m/Y'), $cat->budget)) {
                $totalBudget += $cat->budget[$period->format('m/Y')];
            }
        }

        $totalBudget = round($totalBudget, 2);

        $budgetData = [['x' => '0', 'y' => $totalBudget]];
        for ($x = $startOfMonth; $x <= $endOfMonth; $x->add('day', 1)) {
            $budgetData[] = [
                'x' => $x->format('d/m'),
                'y' => $totalBudget
            ];
        }

        $monthExpenses = Transaction::select(Transaction::raw('date, DAY(date) as day, SUM(amount) as expense'))
            ->whereMonth('transactions.date', $request->month)
            ->whereYear('transactions.date', $request->year)
            ->groupBy('date')
            ->get();

        $expIndex = 0;
        $dailyExpenseData = [['x' => '0', 'y' => 0]];
        $totalExpenseData = [['x' => '0', 'y' => 0]];
        $currTotal = 0;
        $startOfMonth = $period->copy()->startOfMonth();
        $endOfMonth = $period->copy()->endOfMonth();
        if (count($monthExpenses) > 0) {
            for ($x = $startOfMonth; $x <= $endOfMonth; $x->add('day', 1)) {
                if ($expIndex < count($monthExpenses) && $monthExpenses[$expIndex]) {
                    $currExpense = $monthExpenses[$expIndex];
                }

                if ($x->day === $currExpense->day) {
                    $dailyExpenseData[] = [
                        'x' => $x->format('d/m'),
                        'y' => (float)$currExpense->expense,
                    ];

                    $currTotal += $currExpense->expense;

                    $expIndex++;
                } else {
                    $dailyExpenseData[] = [
                        'x' => $x->format('d/m'),
                        'y' => 0,
                    ];
                }

                $totalExpenseData[] = [
                    'x' => $x->format('d/m'),
                    'y' => (float)$currTotal,
                ];
            }
        }

        $allBudgets = 0;
        foreach ($budgets as $cat) {
            foreach ($cat->budget as $month => $value) {
                if ($month > $period->format('m/Y')) {
                    break;
                }
                $allBudgets += $value;
            }
        }

        $allExpenses = Transaction::where('user_id', $user_id)
            ->where('date', '<=', $period->copy()->endOfMonth())
            ->sum('amount');

        $totalSavings = $allBudgets - $allExpenses;

        return response()->json([
            'status' => 'success',
            'graphBudget' => $budgetData,
            'graphDailyExpense' => $dailyExpenseData,
            'graphTotalExpense' => $totalExpenseData,
            'budgetData' => $totalBudget,
            'expensesData' => end($totalExpenseData)['y'],
            'totalSavings' => $totalSavings,
        ]);
    }

    /**
     *
     * Calculation API - getCategoryBars
     *
     */
    function getCategoryBars(Request $request)
    {
        // $this->validate($request, [
        //     'month' => 'required',
        //     'year' => 'required',
        // ]);
        $validator = Validator::make($request->all(), [
            'month' => 'required',
            'year' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid input, please try again'
            ], 422);
        }

        $period = Carbon::createFromDate($request->year, $request->month);
        $user_id = auth()->user()->id;
        $data = Categories::leftJoin('transactions', 'transactions.category_id', '=', 'categories.id')
            ->select(Categories::raw('categories.id, categories.category_title, SUM(transactions.amount) as catTotal, categories.budget, categories.color'))
            ->where('categories.user_id', '=', $user_id)
            // ->whereMonth('transactions.date', $request->month)
            // ->whereYear('transactions.date', $request->year)
            ->whereNotNull('categories.budget->' . $period->format('m/Y'))
            ->groupBy('categories.id')
            ->get();

        if ($data->isEmpty()) {
            return response()->json([
                'status' => 'success_empty',
                'barsData' => $data,
            ]);
        }

        $barsData = [];
        // $period = Carbon::createFromDate($request->year, $request->month);
        foreach ($data as $cat) {
            $currCat = [
                'title' => $cat->category_title,
                'totalExpense' => (float)$cat->catTotal,
                'budget' => (float)$cat->budget[$period->format('m/Y')],
                'color' => $cat->color,
            ];

            $barsData[] = $currCat;
        }

        return response()->json([
            'status' => 'success',
            'barsData' => $barsData
        ]);
    }
}
