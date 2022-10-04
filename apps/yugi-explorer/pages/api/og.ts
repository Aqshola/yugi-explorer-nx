import { withOGImage } from 'next-api-og-image';

/* tslint:disable */
enum QueryParams {
  'title',
}



export default withOGImage<'query', keyof typeof QueryParams>({
  template:{
    html:async ({title})=>{
      return `
        <html>
          <head>
            <link
              href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
              rel="stylesheet"
            />

            <link rel="preconnect" href="https://fonts.googleapis.com" />

            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />

            <link
              href="https://fonts.googleapis.com/css2?family=Grenze:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
              rel="stylesheet"
            />

            <style>
              *{
                font-family: 'Grenze', serif;
              }
            </style>
          </head>
          <body class="w-full bg-blue-900 p-5 flex flex-col justify-center items-center">
            <div class='w-54 h-54 flex'>
              <img src='${process.env.NX_DEPLOY_URL}/image/logo.jpg'} alt="logo" class='w-full h-full object-cover'/>
            </div>
            <div>
                <h1 class='text-yellow-400 text-center font-bold text-3xl'>Yugi Explorer</h1>
                <h2 class='font-medium text-white text-lg text-center'>${title}</h2>
            </div>
          </body>
        </html>
      `
    }
  }
});
