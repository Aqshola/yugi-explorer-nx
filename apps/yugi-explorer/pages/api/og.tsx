import { withOGImage } from 'next-api-og-image';

/* tslint:disable */
enum QueryParams {
  'title',
}

const style = `

  *{
    font-family: 'Grenze', serif;
  }

`;

export default withOGImage<'query', keyof typeof QueryParams>({
  strategy: 'query', // Query strategy is the default one
  template: {
    react: ({ title }) => {
      return (
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
            <style dangerouslySetInnerHTML={{ __html: style }} />
          </head>

          <body className="w-full bg-blue-900 p-5 flex flex-col justify-center items-center">
            <div className='w-54 h-54 flex'>
              <img src="/image/logo.png" alt="logo" className='w-full h-full object-cover'/>
            </div>
            <div>
                <h1 className='text-yellow-400 text-center font-bold text-3xl'>Yugi Explorer</h1>
                <h2 className='font-medium text-white text-lg text-center'>{title}</h2>
            </div>
          </body>
        </html>
      );
    },
  },
});
