

export type YugiCardType = {
  id:number;
  name:string;
  race:string;
  type:string;
  desc:string;
  archetype:string;
  card_images:[
      {
          id:number;
          image_url:string
      }
  ]
};

