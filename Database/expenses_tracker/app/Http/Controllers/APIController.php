<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Transaction;
use App\User;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

use function PHPSTORM_META\map;
use function PHPSTORM_META\type;

class APIController extends Controller
{
    //

    /**
     * Create a new APIController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     *
     * User API Functions - Login, Register, Logout
     *
     */
    function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        try {
            if (!$token = JWTAuth::attempt([
                'email' => request('email'),
                'password' => request('password')
            ])) {
                return response()->json(['status' => 'failed', 'error' => 'invalid credentials'], 422);
            }
        } catch (JWTException $e) {
            return response()->json(['status' => 'failed', 'error' => 'Could not create token'], 500);
        }

        $user = auth()->user();

        $lastLogin = $user->last_login;
        $now = Carbon::now();

        if ($lastLogin !== null && (($lastLogin->year == ($now->year) && $lastLogin->month < ($now->month)) || ($lastLogin->year < ($now->year)))) {
            $categories = Categories::where('user_id', '=', $user->id)->get();
            foreach ($categories as $category) {
                $buffBudget = $category->budget;
                $latestMonth = array_key_last($buffBudget);
                $month = $now->month;
                $year = $now->year;
                $currDate = $month . '/' . $year;
                $buffBudget[$currDate] = (float)$buffBudget[$latestMonth];
                $category->budget = $buffBudget;
                $category->save();
            }
        }

        $user->last_login = $now;
        $user->save();

        $status = 'success';

        $results = [
            'user' => $user
        ];

        return response()->json(compact('status', 'token', 'results'));
    }

    function register(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $existing = User::where('email', '=', request('email'))->first();

        if ($existing) {
            return response()->json(['status' => 'failed', 'error' => 'A user with this email already exists.'], 422);
        }

        $user = new User();
        $user->email = request('email');
        $user->password = \bcrypt(request('password'));
        $user->save();

        $token = JWTAuth::attempt([
            'email' => request('email'),
            'password' => request('password')
        ]);

        // $now = Carbon::now();
        // $month = $now->month;
        // $year = $now->year;
        // $budgetDate = $month . '/' . $year;

        $budgetDate = Carbon::now()->format('m/Y');

        $newBudget = array($budgetDate => (float)1000.00);

        Categories::create(["user_id" => auth()->user()->id, "category_title" => "Food", "budget" => $newBudget]);
        Categories::create(["user_id" => auth()->user()->id, "category_title" => "Others", "budget" => $newBudget]);

        $status = "success";
        return response()->json([
            'status' => $status,
            'message' => 'User successfully registered',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    function logout()
    {
        auth()->logout();

        return response()->json([
            'status' => 'success',
            'message' => 'logout'
        ], 200);
    }

    /**
     *
     * Transactions API functions - getTransactions, createTransaction, updateTransaction, deleteTransaction
     *
     */

    function getTransactions(Request $request)
    {
        $user_id = auth()->user()->id;
        $user_cats = Categories::where('user_id', '=', $user_id)->get();

        $startDate = Carbon::createFromDate($request->startYear, $request->startMonth, $request->startDay);
        return $startDate;

        // $catName = request('catName');

        // if ($catName) {
        //     $list = Categories::where('category_title', '=', request('catName'))
        //         ->where('user_id', '=', $user_id)
        //         ->first();

        //     if (!$list) {
        //         return response()->json([
        //             'error' => 'List does not belong to this user',
        //             'list_id' => $list->id,
        //             'user_id' => $user_id
        //         ], 422);
        //     }
        // }

        $data = Transaction::join('categories', 'category_id', '=', 'categories.id')
            ->select('categories.category_title', 'transactions.description', 'transactions.amount', 'transactions.date')
            ->where('transactions.user_id', '=', $user_id)
            // ->when(, function ($query, $listName) {
            //     return $query->where('lists.list_name', $listName);
            // })
            ->orderBy('transactions.date', 'desc')
            ->get();

        // $current = Task::join('lists', 'list_id', '=', 'lists.id')
        //     ->select('tasks.*', 'lists.list_name')
        //     ->where('tasks.user_id', '=', $user_id)
        //     ->where('tasks.task_status', '=', 1)
        //     ->when($listName, function ($query, $listName) {
        //         return $query->where('lists.list_name', $listName);
        //     })
        //     ->orderBy('tasks.deadline')
        //     ->get();
        $status = 'success';
        return response()->json(compact('status', 'data', 'user_cats'));
    }

    function createTransaction(Request $request)
    {
        $this->validate($request, [
            'description' => 'string|max:255',
            'amount' => "regex:/^-?\d+(\.\d{1,2})?$/"
        ]);

        if (!$request->description) {
            return response()->json([
                'status' => 'failed',
                'error' => 'No title given for new transaction'
            ], 422);
        }

        if (!$request->amount) {
            return response()->json([
                'status' => 'failed',
                'error' => 'No amount given for new transaction'
            ], 422);
        }

        if (!$request->category_id) {
            return response()->json([
                'status' => 'failed',
                'error' => 'No category specified for new transaction'
            ], 422);
        }

        $catExists = Categories::where('id', '=', $request->category_id)->where('user_id', '=', auth()->user()->id)->first();

        if (!$catExists) {
            return response()->json([
                'status' => 'failed',
                'error' => 'Category does not belong to this user'
            ]);
        }

        $transaction = new Transaction();
        $transaction->user_id = auth()->user()->id;
        $transaction->category_id = $request->category_id;
        $transaction->description = $request->description;
        $transaction->amount = $request->amount;
        $transaction->date = $request->date ? $request->date : Carbon::now()->toDateString();
        $transaction->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Transaction added successfully',
            'transaction' => $transaction,
        ], 201);
    }

    function updateTransaction(Request $request)
    {

        $this->validate($request, [
            'transactionID' => 'required',
        ]);

        $transaction = Transaction::where('id', '=', request('transactionID'))
            ->where('user_id', '=', auth()->user()->id)
            ->first();

        if (!$transaction) return response()->json(['status' => 'failed', 'error' => "Transaction not found", 'transactionID' => request('transactionID')]);

        if (!$request->newDesc && !$request->newAmount && !$request->newDate) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No new input given'
            ]);
        }

        $transaction->description = isset($request->newDesc) ? $request->newDesc : $transaction->description;
        $transaction->amount = isset($request->newAmount) ? $request->newAmount : $transaction->amount;
        $transaction->date = isset($request->newDate) ? $request->newDate : $transaction->date;

        try {
            $transaction->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Transaction details updated successfully',
                'transaction' => $transaction
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Transaction details failed to update',
                'transaction' => $transaction,
                'error' => $e->getMessage()
            ], 422);
        }
    }

    function deleteTransaction()
    {
        $transaction = Transaction::where('id', '=', request('transactionID'))->first();
        if (!$transaction) {
            return response()->json([
                'status' => 'failed',
                'error' => 'Error retrieving transaction'
            ], 422);
        } else if ($transaction->user_id !== auth()->user()->id) {
            return response()->json([
                'status' => 'failed',
                'error' => 'Transaction does not belong to this user'
            ]);
        }

        $transaction->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Transaction deleted successfully',
            'transaction' => $transaction
        ], 201);
    }


    /**
     *
     * Categories API functions - getCategories, createCategory, updateCategory, deleteCategory
     *
     */
    function getCategories()
    {
        $user_id = auth()->user()->id;
        $user_cats = Categories::select('category_title')->where('user_id', '=', $user_id)->get();

        if (count($user_cats) === 0) {
            return response()->json([
                'status' => 'success_empty',
                'categoryList' => $user_cats
            ]);
        } else {
            $categoryList = [];
            foreach ($user_cats as $cat) {
                $categoryList[] = $cat->category_title;
            }
            return response()->json([
                'status' => 'success',
                'categoryList' => $categoryList
            ]);
        }
    }

    function createCategory(Request $request)
    {
        $this->validate($request, [
            'category_title' => 'string|max:255',
            'budget' => "regex:/^\d+(\.\d{1,2})?$/"
        ]);

        if (!$request->category_title) {
            return response()->json([
                'status' => 'failed',
                'error' => 'No title given for new category'
            ], 422);
        }

        if (!$request->budget) {
            return response()->json([
                'status' => 'failed',
                'error' => 'No budget given for new category'
            ], 422);
        }

        $count = Categories::where('user_id', auth()->user()->id)->count();
        if ($count === 10) {
            return response()->json([
                'status' => 'failed_max',
                'error' => 'User already has 10 categories'
            ]);
        }

        $existing = Categories::where('category_title', $request->category_title)->first();

        if ($existing) {
            return response()->json([
                'status' => 'failed_existing',
                'error' => 'Category already exists'
            ]);
        }

        // $now = Carbon::now();
        // $month = $now->month;
        // $year = $now->year;
        // $budgetDate = $month . '/' . $year;
        $budgetDate = Carbon::now()->format('m/Y');

        $newBudget = array($budgetDate => (float)$request->budget);
        $category = new Categories();
        $category->user_id = auth()->user()->id;
        $category->category_title = $request->category_title;
        $category->budget = $newBudget;
        if ($request->color) {
            $category->color = $request->color;
        }
        $category->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Category added successfully',
            'category' => $category,
        ], 201);
    }

    function updateCategory(Request $request)
    {

        $this->validate($request, [
            'categoryID' => 'required',
        ]);

        $category = Categories::where('id', '=', request('categoryID'))
            ->where('user_id', '=', auth()->user()->id)
            ->first();

        if (!$category) return response()->json([
            'status' => 'failed',
            'error' => "Category not found",
            'categoryID' => request('categoryID')
        ]);

        if (!$request->newTitle && !$request->newBudget) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No new input given'
            ]);
        }

        $category->category_title = isset($request->newTitle) ? $request->newTitle : $category->category_title;

        if (isset($request->newBudget)) {
            $buffBudget = $category->budget;
            $now = Carbon::now();
            $month = $now->month;
            $year = $now->year;
            $currDate = $month . '/' . $year;
            $buffBudget[$currDate] = (float)$request->newBudget;
            $category->budget = $buffBudget;
        }

        try {
            $category->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Category details updated successfully',
                'category' => $category
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Category details failed to update',
                'category' => $category,
                'error' => $e->getMessage()
            ], 422);
        }
    }

    function deleteCategory()
    {
        $category = Categories::where('id', '=', request('categoryID'))->first();
        if (!$category) {
            return response()->json([
                'error' => 'Error retrieving category'
            ], 422);
        } else if ($category->user_id !== auth()->user()->id) {
            return response()->json([
                'status' => 'failed',
                'error' => 'Category does not belong to this user'
            ]);
        }

        $category->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted successfully',
            'category' => $category
        ], 201);
    }

    /**
     *
     * Graph API (for Victory library) - getCategoriesPie, getOverviewGraph
     *
     */

    function checkBudget()
    {
        $category = Categories::first();
        // return ($category->created_at)->gt(Carbon::createFromFormat('m/Y', array_key_last($category->budget)));
        // return Carbon::createFromFormat('m/Y', array_key_last($category->budget))->endOfMonth();
        return $category->budget[array_key_last($category->budget)];
    }

    function getCategoriesPie(Request $request)
    {
        $this->validate($request, [
            'month' => 'required',
            'year' => 'required',
        ]);

        $user_id = auth()->user()->id;
        $data = Transaction::join('categories', 'category_id', '=', 'categories.id')
            ->select(Transaction::raw('categories.id, categories.category_title, SUM(transactions.amount) as catTotal'))
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

        // return $data;
        $pieData = [];
        foreach ($data as $cat) {
            $currCat = [
                'x' => $cat->id,
                'y' => (float)$cat->catTotal,
                'label' => $cat->category_title
            ];

            $pieData[] = $currCat;
        }

        return response()->json([
            'status' => 'success',
            'pieData' => $pieData
        ]);
    }

    function getOverviewData(Request $request)
    {
        // $this->validate($request, [
        //     'month' => 'required',
        //     'year' => 'required',
        // ]);

        $period = Carbon::now();
        if ($request->month && $request->year) {
            $period = Carbon::createFromDate($request->year, $request->month);
        }

        $user_id = auth()->user()->id;

        $budgets = Categories::select('budget')->where('user_id', $user_id)->get();
        $startOfMonth = $period->copy()->startOfMonth();
        $endOfMonth = $period->copy()->endOfMonth();
        // $currDate = Carbon::now();
        $totalBudget = 0;

        foreach ($budgets as $cat) {

            if (array_key_exists($period->format('m/Y'), $cat->budget)) {
                $totalBudget += $cat->budget[$period->format('m/Y')];
            }
        }

        // return [$startOfMonth, $endOfMonth];
        $budgetData = [['x' => '0', 'y' => $totalBudget]];
        for ($x = $startOfMonth; $x <= $endOfMonth; $x->add('day', 1)) {
            $budgetData[] = [
                'x' => $x->format('d/m'),
                'y' => $totalBudget
            ];
        }
        // return response()->json()->compact(['totalBudget', 'budgetData']);

        $monthExpenses = Transaction::select(Transaction::raw('date, DAY(date) as day, SUM(amount) as expense'))
            ->whereMonth('transactions.date', $request->month)
            ->whereYear('transactions.date', $request->year)
            ->groupBy('date')
            ->get();

        // return count($monthExpenses);
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

        $allExpenses = Transaction::where('user_id', $user_id)
            ->sum('amount');

        $totalSavings = $totalBudget - $allExpenses;

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
     * Calculation API - getCategoryBars, getSummaryData
     *
     */
    function getCategoryBars(Request $request)
    {
        $this->validate($request, [
            'month' => 'required',
            'year' => 'required',
        ]);

        $user_id = auth()->user()->id;
        $data = Categories::join('transactions', 'transactions.category_id', '=', 'categories.id')
            ->select(Categories::raw('categories.id, categories.category_title, SUM(transactions.amount) as catTotal, categories.budget, categories.color'))
            ->where('transactions.user_id', '=', $user_id)
            ->whereMonth('transactions.date', $request->month)
            ->whereYear('transactions.date', $request->year)
            ->groupBy('categories.id')
            ->get();

        if ($data->isEmpty()) {
            return response()->json([
                'status' => 'success_empty',
                'barsData' => $data,
            ]);
        }

        // return $data;
        $barsData = [];
        $period = $request->month . "/" . $request->year;
        foreach ($data as $cat) {
            // return $cat->budget[0];
            $currCat = [
                'title' => $cat->category_title,
                'totalExpense' => (float)$cat->catTotal,
                'budget' => (float)$cat->budget[$period],
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
