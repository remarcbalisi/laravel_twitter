<?php

namespace App\Http\Controllers;

use App\Http\Resources\FileUploadResource;
use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    public function __invoke(Request $request)
    {
        $path = $request->file('file')->store('posts', 'public');
        return new FileUploadResource((object) ['path' => $path]);
    }
}
