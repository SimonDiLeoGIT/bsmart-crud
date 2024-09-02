<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 15);
    
        
        $products = Product::with('category')->paginate($perPage);
    
        return response()->json($products, 200);
    }


    public function store(Request $request)
    {
        $validated = $this->validateRequest($request);
    
        $product = Product::create($validated);
    
        return response()->json($product, 201);      
    }


    public function show(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        
        return response()->json($product, 200);      
    }


    public function update(Request $request, string $id)
    {
        $validated = $this->validateRequest($request);
    
        $product = Product::find($id);
    
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
    
        $product->update($validated);
    
        return response()->json($product, 200);       
    }


    public function destroy(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);      
    }

    private function validateRequest(Request $request)
    {
        return $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
        ]);
    }
}
