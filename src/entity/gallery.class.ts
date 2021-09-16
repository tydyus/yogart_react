import { request, gql } from 'graphql-request'

export interface IGallery{
    name:string,
    content:string,
    image:string,
    paints:Array<{image:string}>
}
interface IDirectPeinture{
    titre:string,
    description:string,
    miniature:{filename_disk:string},
    photos:Array<{id:number,directus_files_id:{filename_disk:string}}>
}
export interface IInfo{
    id:number,
    description_art:string,
    description_yoga:string,
    description_index:string
}
export interface IYoga{
    titre:string,
    description:string,
    thumbnail: {
        filename_disk:string,
    }
    etapes: Array<{
        titre:string,
        description:string,
        postures:Array<{
        titre:string,
        mouvements:Array<{
            description:string,
            etapes_img:Array<{
            directus_files_id:{
                filename_disk:string,
            }
            }>
        }>
        }>
        sub_etapes:{
        titre:string,
        description:string,
        postures:Array<{
            titre:string,
            mouvements:Array<{
            description:string,
            etapes_img:Array<{
            directus_files_id:{
                filename_disk:string,
            }
            }>
            }>
        }>
        }
    }>
}
export class Gallery{

    

    static async getGallerys():Promise<{g:Array<IGallery>,info:IInfo,fiche_yoga:any}>{

        let gals:Array<IGallery> = []
        let info={id:0,description_art:"",description_yoga:"",description_index:""}
        let yoga: Array<IYoga> =[];
        const query = gql`
        {
            peinture (filter:{status: {_eq: "published"}}) {
                titre
                description
                miniature {
                  filename_disk
                }
                photos (sort:"id") {
                  id,
                  directus_files_id {
                    filename_disk
                  }
                }
              }
            fiche_yoga (filter:{status: {_eq: "published"}}) {
              titre
              description
              thumbnail {
                filename_disk
              }
              etapes {
                titre
                description
                postures{
                  titre
                  mouvements{
                    description
                    etapes_img{
                      directus_files_id{
                        filename_disk
                      }
                    }
                  }
                }
                sub_etapes{
                  titre
                  description
                  postures{
                    titre
                    mouvements{
                    description
                      etapes_img{
                      directus_files_id{
                        filename_disk}
                      }
                    }
                  }
                }
              }
            }
            infos_generale {
                id
                description_art
                description_yoga
                description_index
              }
          }
        `;
        await request('https://christineapi.chiliwa.com/graphql', query)
        .then((data:{peinture:Array<IDirectPeinture>,infos_generale:IInfo,fiche_yoga:Array<IYoga>}) => {
            data.peinture.map( (d:IDirectPeinture) =>
                {
                    let paints: Array<{image:string}> = [];
                    d.photos.map(p =>
                        paints.push({"image":"https://christineapi.chiliwa.com/assets/"+p.directus_files_id.filename_disk}))
                    gals.push({
                    "name" : d.titre,
                    "content": d.description,
                    "image": "https://christineapi.chiliwa.com/assets/"+d.miniature.filename_disk,
                    "paints": paints
                })
                info=data.infos_generale
                yoga = data.fiche_yoga
                return true
            }
            )
            return {g:gals,info:info,fiche_yoga:yoga};
        })
        .catch(er => console.log("error: "+er));
        return {g:gals,info:info,fiche_yoga:yoga};
    }
}