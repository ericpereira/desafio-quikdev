<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Flugg\Responder\Responder;

use Illuminate\Support\Facades\Http;

class MoviesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //carrega os filmes
        //pega o período passado ou coloca como dia
        $period = $request->query('period') ? $request->query('period') : 'day';
        $response = Http::get('https://api.themoviedb.org/3/trending/movie/'.$period, [
            'api_key' => '4ec327e462149c3710d63be84b81cf4f',
            'language' => 'pt-BR'
        ]);

        //ordena em ordem alfabética caso tenham passado a flag
        if($request->query('order') == 'alphabetic'){

        }

        return responder()->success($response->json())->respond();
    }

    public function genres()
    {
        try {
            //carrega os filmes
            $response = Http::get('https://api.themoviedb.org/3/genre/movie/list', [
                'api_key' => '4ec327e462149c3710d63be84b81cf4f',
                'language' => 'pt-BR',
            ]);

            return responder()->success($response->json()['genres'])->respond();
        } catch (\Throwable $th) {
            return responder()->error(400, 'Erro ao carregar gêneros')->respond(400);
        }        
    }

    public function search(Request $request)
    {
        try {
            //carrega os filmes
            $response = Http::get('https://api.themoviedb.org/3/search/keyword', [
                'api_key' => '4ec327e462149c3710d63be84b81cf4f',
                'language' => 'pt-BR',
                'query' => $request->query('query'),
                'page' => $request->query('page') ? $request->query('page') : '1'
            ]);
            
            //var_dump($request->query);
            return responder()->success($response->json())->respond();
        } catch (\Throwable $th) {
            return responder()->error(400, 'Erro ao carregar busca')->respond(400);
        }        
    }

    public function detail(Request $request, $movie_id)
    {
        try {
            //carrega os filmes
            $response = Http::get('https://api.themoviedb.org/3/movie/'.$movie_id, [
                'api_key' => '4ec327e462149c3710d63be84b81cf4f',
                'language' => 'pt-BR',
            ]);
            return responder()->success($response->json())->respond();
        } catch (\Throwable $th) {
            return responder()->error(400, 'Erro ao carregar dados do filme')->respond(400);
        }        
    }

    public function baseUrl()
    {
        try {
            //carrega os filmes
            $response = Http::get('https://api.themoviedb.org/3/configuration', [
                'api_key' => '4ec327e462149c3710d63be84b81cf4f',
                'language' => 'pt-BR',
            ]);
            return responder()->success($response->json())->respond();
        } catch (\Throwable $th) {
            return responder()->error(400, 'Erro ao carregar dados')->respond(400);
        }        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
