<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function createPost(Request $request)
    {
        $user = $request->user();
        
        $post = new Post([
            'user_id' => $user->id,
            'image_url' => $request->input('image_url'),
        ]);
        
        $user->posts()->save($post);
        
        return response()->json(['message' => 'Post created successfully',"post"=>$post]);
    }
}
