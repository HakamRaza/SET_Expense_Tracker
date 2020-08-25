<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    //

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
            ], 422);
        }

        $existing = Categories::where('category_title', $request->category_title)->first();

        if ($existing) {
            return response()->json([
                'status' => 'failed_existing',
                'error' => 'Category already exists'
            ], 422);
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
        ], 422);

        if (!$request->newTitle && !$request->newBudget) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No new input given'
            ], 422);
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
            ], 422);
        }

        $category->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted successfully',
            'category' => $category
        ], 201);
    }
}
