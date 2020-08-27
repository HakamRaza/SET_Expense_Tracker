<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    //

    /**
     *
     * Transactions API functions - getTransactions, createTransaction, updateTransaction, deleteTransaction
     *
     */

    function getTransactions(Request $request)
    {
        $user_id = auth()->user()->id;
        $user_cats = Categories::where('user_id', '=', $user_id)->get();

        $startDate = $endDate = $minPrice = $maxPrice = null;
        $description = "";

        if ($request->startYear && $request->startMonth && $request->startDay) {
            $startDate = Carbon::createFromDate($request->startYear, $request->startMonth, $request->startDay)->toDateString();
        }

        if ($request->endYear && $request->endMonth && $request->endDay) {
            $endDate = Carbon::createFromDate($request->endYear, $request->endMonth, $request->endDay)->toDateString();
        }

        if ($request->minPrice) {
            $minPrice = $request->minPrice;
        }

        if ($request->maxPrice) {
            $maxPrice = $request->maxPrice;
        }

        if ($request->description) {
            $description = $request->description;
        }

        $catName = request('categoryName');

        if ($catName) {
            $cat = Categories::where('category_title', '=', request('categoryName'))
                ->where('user_id', '=', $user_id)
                ->first();

            if (!$cat) {
                return response()->json([
                    'error' => 'Category does not belong to this user',
                    'categoryName' => $catName,
                    'user_id' => $user_id
                ], 422);
            }
        }

        $data = Transaction::join('categories', 'category_id', '=', 'categories.id')
            ->select('transactions.id', 'categories.category_title', 'transactions.description', 'transactions.amount', 'transactions.date')
            ->where('transactions.user_id', '=', $user_id)
            ->when($startDate, function ($query, $startDate) {
                return $query->where('transactions.date', '>=', $startDate);
            })
            ->when($endDate, function ($query, $endDate) {
                return $query->where('transactions.date', '<=', $endDate);
            })
            ->when($catName, function ($query, $catName) {
                return $query->where('categories.category_title', $catName);
            })
            ->when($minPrice, function ($query, $minPrice) {
                return $query->where('transactions.amount', '>=', $minPrice);
            })
            ->when($maxPrice, function ($query, $maxPrice) {
                return $query->where('transactions.amount', '<=', $maxPrice);
            })
            ->when($description, function ($query, $description) {
                return $query->where('transactions.description', 'LIKE', '%' . $description . '%');
            })
            ->orderBy('transactions.date', 'desc')
            ->limit(100)
            ->get();

        $totalAmount = 0;
        foreach ($data as $transaction) {
            $totalAmount += (float)$transaction->amount;
        }

        $status = 'success';
        return response()->json(compact('status', 'totalAmount', 'data', 'user_cats'));
    }

    function createTransaction(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'string|max:255',
            'amount' => "regex:/^-?\d+(\.\d{1,2})?$/"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid input, please try again'
            ], 422);
        }

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
            ], 422);
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

        if (!$transaction) {
            return response()->json([
                'status' => 'failed',
                'error' => "Transaction not found",
                'transactionID' => request('transactionID')
            ], 422);
        }

        if (!$request->newDesc && !$request->newAmount && !$request->newDate && !$request->newCategoryID) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No new input given'
            ], 422);
        }

        $transaction->description = isset($request->newDesc) ? $request->newDesc : $transaction->description;
        $transaction->amount = isset($request->newAmount) ? $request->newAmount : $transaction->amount;
        $transaction->date = isset($request->newDate) ? $request->newDate : $transaction->date;
        $transaction->category_id = isset($request->newCategoryID) ? $request->newCategoryID : $transaction->category_id;

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
            ], 422);
        }

        $transaction->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Transaction deleted successfully',
            'transaction' => $transaction
        ], 201);
    }
}
