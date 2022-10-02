import { Fetcher } from 'swr';

// const fetcher = (url: string) =>
// fetch(url).then((res) => res.json()
// );

const fetcher = async (url:string)=>{
    const res=await fetch(url)
    if(!res.ok){
        return []
    }
    return res.json()
}
export default fetcher
