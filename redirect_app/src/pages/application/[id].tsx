import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

interface HashObject {
  [key: string]: string;
}

interface Params {
  application_id: string;
  access_token: string;
  scope: string;
  token_type: string;
}

export default function Application() {
  const router = useRouter()

  useEffect(() => {
    // Função para processar os parâmetros após o hash
    function processHashParams(hash: string) {
      // Remover o "#" do início da string e dividir em pares chave-valor
      const params = hash.slice(1).split('&');
      const data: HashObject = {};

      // Processar cada par chave-valor
      params.forEach(param => {
        const [key, value] = param.split('=');
        if (key && value) {
          data[key] = decodeURIComponent(value);
        }
      });

      return data;
    }

    if (router.query.id) {

      // Extrair os parâmetros após o hash
      const hashParams = processHashParams(window.location.hash);

      // Combinar os parâmetros em um único objeto
      const params: Params = { 
        application_id: router.query.id[0],
        access_token: hashParams.access_token,
        scope: hashParams.scope,
        token_type: hashParams.token_type,
       };
      console.log("params", params)

      // Verificar se todas as variáveis necessárias existem
      if (
        params.application_id &&
        params.access_token &&
        params.scope &&
        params.token_type
      ) {
        // Construir a URL
        const formUrl = `https://${params.application_id}.chromiumapp.org/#access_token=${params.access_token}&scope=${encodeURIComponent(params.scope)}&token_type=${params.token_type}`;

        console.log("formUrl", formUrl)
        // Abrir a URL
        // window.open(formUrl, '_self');
      } else {
        console.error('Algumas variáveis estão faltando.');
      }
    }

  }, [router.query]); // Executar apenas uma vez após a montagem do componente

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>

      </main>
    </>
  );
}