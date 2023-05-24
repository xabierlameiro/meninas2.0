import { fetchGraphQL } from '@helpers/graphql'
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

async function getProducts() {
   const {data} = await fetchGraphQL(`
          query {
            productoCollection {
              items {
                nombre
                descripcion
                precio
                url
                categoriaPrincipal {
                  slug
                }
                portada {
                  url
                }
                categoriasCollection {
                  items {
                    nombre
                  }
                }
              }
            }
          }
        `
        )
        return data?.productoCollection?.items

  }

export default async function Home() {
  const data = await getProducts()

  return (
    <>
        <button className="snipcart-add-item"
  data-item-id="starry-night"
  data-item-price="79.99"
  data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
  data-item-image="/assets/images/starry-night.jpg"
  data-item-name="The Starry Night">
  Add to cart
</button>
    <div>
      <h1>Productos</h1>
      <ul>
        {data?.map((producto:any) => (
          <li key={producto.nombre}>
            <Link href={`/${producto.categoriaPrincipal.slug}/${producto.url}`}>
              <h2>{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <p>{producto.precio}</p>
              <p>{producto.url}</p>
              <Image src={producto.portada.url} alt="Picture of the author" width={200} height={200} />
              <p>{producto.categoriasCollection.items.nombre}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>

    <Script id="dwewewe">
      {` 
        window.SnipcartSettings = {
          publicApiKey: "MjFhYTFlZTMtYjJmYi00MTg1LWFjMjAtNzI1YjFmNDMzNWM1NjM3MTk2NDAwMTg4MDMzNjY1",
          loadStrategy: "on-user-interaction",
          modalStyle: "side"
        };
      
        (function(){var c,d;(d=(c=window.SnipcartSettings).version)!=null||(c.version="3.0");var s,S;(S=(s=window.SnipcartSettings).timeoutDuration)!=null||(s.timeoutDuration=2750);var l,p;(p=(l=window.SnipcartSettings).domain)!=null||(l.domain="cdn.snipcart.com");var w,u;(u=(w=window.SnipcartSettings).protocol)!=null||(w.protocol="https");var m,g;(g=(m=window.SnipcartSettings).loadCSS)!=null||(m.loadCSS=!0);var y=window.SnipcartSettings.version.includes("v3.0.0-ci")||window.SnipcartSettings.version!="3.0"&&window.SnipcartSettings.version.localeCompare("3.4.0",void 0,{numeric:!0,sensitivity:"base"})===-1,f=["focus","mouseover","touchmove","scroll","keydown"];window.LoadSnipcart=o;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r();function r(){window.SnipcartSettings.loadStrategy?window.SnipcartSettings.loadStrategy==="on-user-interaction"&&(f.forEach(function(t){return document.addEventListener(t,o)}),setTimeout(o,window.SnipcartSettings.timeoutDuration)):o()}var a=!1;function o(){if(a)return;a=!0;let t=document.getElementsByTagName("head")[0],n=document.querySelector("#snipcart"),i=document.querySelector('src[src^="'.concat(window.SnipcartSettings.protocol,"://").concat(window.SnipcartSettings.domain,'"][src$="snipcart.js"]')),e=document.querySelector('link[href^="'.concat(window.SnipcartSettings.protocol,"://").concat(window.SnipcartSettings.domain,'"][href$="snipcart.css"]'));n||(n=document.createElement("div"),n.id="snipcart",n.setAttribute("hidden","true"),document.body.appendChild(n)),h(n),i||(i=document.createElement("script"),i.src="".concat(window.SnipcartSettings.protocol,"://").concat(window.SnipcartSettings.domain,"/themes/v").concat(window.SnipcartSettings.version,"/default/snipcart.js"),i.async=!0,t.appendChild(i)),!e&&window.SnipcartSettings.loadCSS&&(e=document.createElement("link"),e.rel="stylesheet",e.type="text/css",e.href="".concat(window.SnipcartSettings.protocol,"://").concat(window.SnipcartSettings.domain,"/themes/v").concat(window.SnipcartSettings.version,"/default/snipcart.css"),t.prepend(e)),f.forEach(function(v){return document.removeEventListener(v,o)})}function h(t){!y||(t.dataset.apiKey=window.SnipcartSettings.publicApiKey,window.SnipcartSettings.addProductBehavior&&(t.dataset.configAddProductBehavior=window.SnipcartSettings.addProductBehavior),window.SnipcartSettings.modalStyle&&(t.dataset.configModalStyle=window.SnipcartSettings.modalStyle),window.SnipcartSettings.currency&&(t.dataset.currency=window.SnipcartSettings.currency),window.SnipcartSettings.templatesUrl&&(t.dataset.templatesUrl=window.SnipcartSettings.templatesUrl))}})();
        `}
    </Script>
    </>
  )
}

