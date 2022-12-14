import { withOGImage } from 'next-api-og-image';

/* tslint:disable */
enum QueryParams {
  'title',
  'logo'
}



export default withOGImage<'query', keyof typeof QueryParams>({
  template:{
    html:async ({title,logo})=>{
      return `
        <html>
          <head>
            ${getStyle()}
          </head>
          <body class="container">
            <div class='img-container'>
              <img src='${logo}' alt="logo" class=img'/>
            </div>
            <div>
                <h1 class='heading1'>Yugi Explorer</h1>
                <h2 class='heading2'>${title}</h2>
            </div>
          </body>
        </html>
      `
    }
  }
});


const getStyle=()=> `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Grenze:wght@400;500;600;700&display=swap');
    *{
      font-family: 'Grenze', serif;
    }

    .container{
      display: flex;
      flex-direction: column;
      width:100vw;
      height:100vh;
      background-color:#11007E;
      justify-content: center;
      align-items: center;
    }

    .img-container{
      width:200px;
      height:200px;
      display:flex;
      justify-content:center;
    }

    .img{
      width:100%;
      height:100%;
      object-fit:cover;
      display:flex;
    }

    .heading1{
      color:#FFC100;
      text-align:center;
      font-weight:700;
      font-size:24px;
      line-height:32px;
    }

    .heading2{
      color:white;
      text-align:center;
      font-weight:500;
      font-size:18px;
      line-height:28px;
    }



  </style>


`
