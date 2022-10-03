import NextImage from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import { AnimatePresence, motion } from 'framer-motion';
import { YugiCardType } from '../../types/card';
import Loading from '../../components/loading/loading';
import Head from '../../components/layouts/head/head';
import Layout from '../../components/layouts/layout/layout';


function Id() {
  const {
    query: { id },
  } = useRouter();

  const router = useRouter();

  type Response = {
    data: YugiCardType[];
  };

  const API = `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${id}`;
  const { data, error } = useSWR<Response>(API, fetcher);

  return (
    <>
    {data &&(
      <Head title={"Card " + typeof id!==undefined ?id.toString():""} description={"Detail about "+id.toString()}/>
    )}
    <Layout>
      <div className="px-5">
        <button
          onClick={() => router.back()}
          className="bg-yellow-primary px-5 py-2 rounded-md font-grenze"
        >
          Back
        </button>
      </div>
      <div className="flex flex-col md:flex-row">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.2 }}
          layout
          layoutId={`picture${id}`}
          className="py-10 md:py-10 px-5 w-full mx-auto md:w-[600px]"
        >
          <NextImage
            src={
              data && data.data[0].card_images
                ? data.data[0].card_images[0].image_url
                : "/image/CardBack.jpg"
            }
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/image/CardBack.jpg"
            width={400}
            height={600}
            layout="responsive"
          />
        </motion.div>

        <div className="md:py-10 pb-5 px-10 w-full">
          {!data && (
            <AnimatePresence>
              <Loading />
            </AnimatePresence>
          )}

          {data && (
            <>
              <h1 className="text-white md:text-5xl font-grenze text-4xl">
                {data.data[0].name}
              </h1>
              <table className="mt-5 text-white w-full font-grenze text-xl font-light">
                <tbody>
                  <tr>
                    <td className="w-24 font-medium">Type</td>
                    <td>:</td>
                    <td>{data.data[0].type}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Race</td>
                    <td>:</td>
                    <td>{data.data[0].race}</td>
                  </tr>
                  <tr className="font-medium">
                    <td>Archtype</td>
                    <td>:</td>
                    <td>{data.data[0].archetype || "Unknown"}</td>
                  </tr>
                  <tr className="md:table-row w-full">
                    <td className="pt-10" colSpan={3}>
                      <span className="font-medium">Ability</span>
                      <p className="mt-5">{data.data[0].desc}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </Layout>
    </>
  );
}

export default Id;
