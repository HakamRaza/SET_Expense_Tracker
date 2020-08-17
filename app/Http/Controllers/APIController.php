<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

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
     * User API Functions - Login, Register
     *
     */
    function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
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

        $status = 'success';

        $results = [
            'user' => $user
        ];

        // $existing = Lists::where('user_id', '=', $user->id)->first();

        // if (!$existing) {
        //     $list = new Lists();
        //     $list->user_id = auth()->user()->id;
        //     $list->list_name = "General";
        //     $list->save();
        // }

        return response()->json(compact('status', 'token', 'results'));
    }

    function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|regex:/^([^0-9]*)$/|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $existing = User::where('email', '=', request('email'))->first();

        if ($existing) {
            return response()->json(['error' => 'A user with this email already exists.'], 422);
        }

        $user = new User();
        $user->name = request('name');
        $user->email = request('email');
        $user->password = \bcrypt(request('password'));
        $user->save();

        $token = JWTAuth::attempt([
            'email' => request('email'),
            'password' => request('password')
        ]);

        // $list = new Lists();
        // $list->user_id = auth()->user()->id;
        // $list->list_name = "General";
        // $list->save();

        Categories::create(["user_id" => auth()->user()->id, "title" => "Food", "budget" => 1000.00]);
        Categories::create(["user_id" => auth()->user()->id, "title" => "Bills", "budget" => 1000.00]);

        $status = "success";
        return response()->json([
            'status' => $status,
            'message' => 'User successfully registered',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    /**
     *
     * Transactions API functions - createTransaction, editTransaction, deleteTransaction
     *
     */
    function createTransaction(Request $request)
    {
        $this->validate($request, [
            'title' => 'string|max:255',
            'amount' => "regex:/^\d+(\.\d{1,2})?$/"
        ]);

        if (!$request->title) {
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
            return response()->json()([
                'status' => 'failed',
                'error' => 'No category specified for new transaction'
            ], 422);
        }

        $transaction = new Transaction();
        $transaction->user_id = auth()->user()->id;
        $transaction->category_id = $request->category_id;
        $transaction->title = $request->title;
        $transaction->amount = $request->amount;
        $transaction->date = $request->date;
        $transaction->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Transaction added successfully',
            'transaction' => $transaction,
        ], 201);
    }


    /**
     *
     * Categories API functions - createCategory, editCategory, deleteCategory
     *
     */
    function createCategory(Request $request)
    {
        $this->validate($request, [
            'title' => 'string|max:255',
            'budget' => "regex:/^\d+(\.\d{1,2})?$/"
        ]);

        if (!$request->title) {
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

        $category = new Transaction();
        $category->user_id = auth()->user()->id;
        $category->title = $request->title;
        $category->budget = $request->budget;
        $category->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Category added successfully',
            'category' => $category,
        ], 201);
    }
}
