<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Utils\ResponseHandler;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    protected $responseHandler;

    public function __construct(ResponseHandler $responseHandler)
    {
        $this->responseHandler = $responseHandler;
    }


    public function index(Request $request, string $fieldSort = 'id', string $sortOrder = 'asc')
    {
        $perPage = $request->get('per_page', 15);
        $name = $request->get('name', '');
    
        $products = Product::with('category')
            ->when($name, function ($query, $name) {
                return $query->where('name', 'like', '%' . $name . '%');
            })
            ->orderBy($fieldSort, $sortOrder)
            ->paginate($perPage);
    
        return response()->json($products, 200);
    }


    public function store(Request $request)
    {
        try {
            $validated = $this->validateRequest($request);
            $product = Product::create($validated);
            return response()->json($product, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->responseHandler->formatValidationErrorResponse($e);
        }
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
        try {
            $validated = $this->validateRequest($request);
        
            $product = Product::find($id);
        
            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }
        
            $product->update($validated);
        
            return response()->json($product, 200);      
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->responseHandler->formatValidationErrorResponse($e);
        } 
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
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);
    }

}
