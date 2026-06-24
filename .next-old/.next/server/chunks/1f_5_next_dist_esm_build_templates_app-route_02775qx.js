module.exports=[26941,e=>{"use strict";var t=e.i(88717),o=e.i(60068),r=e.i(3362),i=e.i(8094),a=e.i(89548),n=e.i(88829),s=e.i(24082),d=e.i(38952),l=e.i(83052),p=e.i(88209),c=e.i(62438),u=e.i(56669),g=e.i(34321),h=e.i(94734),x=e.i(40918),y=e.i(93695);e.i(54997);var f=e.i(30901),m=e.i(9069),b=e.i(3934),v=e.i(32126);async function w(e){try{let{practiceName:t,contactName:o,email:r,phone:i,website:a,bookingUrl:n,address:s,postcode:d,town:l,locationCount:p,services:c,nhsTests:u,privateTests:g,appointmentSystem:h,appointmentSystemOther:x,openingHours:y,message:f,audiologyAddon:w}=await e.json();if(!t||!o||!r||!i||!s||!d||!l)return m.NextResponse.json({error:"Missing required fields"},{status:400});let R=null,A=null;try{let e=d.replace(/\s/g,"").toUpperCase(),t=await fetch(`https://api.postcodes.io/postcodes/${e}`),o=await t.json();200===o.status&&o.result?(R=o.result.latitude,A=o.result.longitude):o.terminated?.latitude&&o.terminated?.longitude&&(R=o.terminated.latitude,A=o.terminated.longitude)}catch(e){console.warn("Postcode geocoding failed:",e)}let $=await (0,v.createClient)(),{data:k,error:E}=await $.from("optician_listings").insert({practice_name:t,contact_name:o,email:r,phone:i,website:a||null,booking_url:n||null,address:s||null,postcode:d,town:l||null,lat:R,lng:A,services:c||[],nhs_tests:u??!1,private_tests:g??!1,opening_hours:y||null,location_count:p||"1",appointment_system:h||null,appointment_system_other:"Other"===h&&x||null,message:f||null,audiology_addon:w??!1,active:!1,stripe_status:"none"}).select("id").single();if(E)return console.error("Supabase insert error:",E),m.NextResponse.json({error:"Failed to save listing"},{status:500});let C=k.id,_="Other"===h?`Other — ${x||"(not specified)"}`:h||"Not specified",P=`
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
  <div style="background: #0d1b3e; padding: 24px 32px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #fff; font-size: 20px; margin: 0;">New Listing Application</h1>
    <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 8px 0 0;">Submitted via eyetest.co.uk/get-listed</p>
  </div>

  <div style="border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px; margin-top: 0;">Practice Details</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 160px;">Practice name:</td><td style="padding: 6px 0; font-weight: 600;">${t}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Contact name:</td><td style="padding: 6px 0;">${o}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Email:</td><td style="padding: 6px 0;"><a href="mailto:${r}" style="color: #0ea5a0;">${r}</a></td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Phone:</td><td style="padding: 6px 0;"><a href="tel:${i}" style="color: #0ea5a0;">${i}</a></td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Website:</td><td style="padding: 6px 0;">${a?`<a href="${a}" style="color: #0ea5a0;">${a}</a>`:"(not provided)"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Booking URL:</td><td style="padding: 6px 0;">${n?`<a href="${n}" style="color: #0ea5a0;">${n}</a>`:"(not provided)"}</td></tr>
    </table>

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Location</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 160px;">Address:</td><td style="padding: 6px 0;">${s}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Postcode:</td><td style="padding: 6px 0; font-weight: 600;">${d}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Town/City:</td><td style="padding: 6px 0;">${l}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Coordinates:</td><td style="padding: 6px 0;">${R&&A?`${R}, ${A}`:"(geocoding failed)"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Number of locations:</td><td style="padding: 6px 0; font-weight: 600;">${p||"1"}</td></tr>
    </table>

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Services & Systems</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 160px;">Services:</td><td style="padding: 6px 0;">${c&&c.length>0?c.join(", "):"(none selected)"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">NHS tests:</td><td style="padding: 6px 0; font-weight: 600;">${u?"Yes":"No"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Private tests:</td><td style="padding: 6px 0; font-weight: 600;">${g?"Yes":"No"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Appointment system:</td><td style="padding: 6px 0; font-weight: 600;">${_}</td></tr>
    </table>

    ${y?`
    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Opening Hours</h2>
    <p style="margin: 12px 0 24px; line-height: 1.6; background: #f9fafb; padding: 16px; border-radius: 8px;">${y}</p>
    `:""}

    ${f?`
    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Additional Information</h2>
    <p style="margin: 12px 0 24px; line-height: 1.6; background: #f9fafb; padding: 16px; border-radius: 8px;">${f}</p>
    `:""}

    ${w?`
    <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <p style="margin: 0; font-size: 13px; color: #1e40af; font-weight: 600;">
        &#128266; Also interested in hearingtest.co.uk listing (+&pound;49/year)
      </p>
    </div>
    `:""}

    <div style="background: #f0fdfa; border: 1px solid #0ea5a0; border-radius: 8px; padding: 16px; margin-top: 16px;">
      <p style="margin: 0; font-size: 13px; color: #666;">
        Listing ID: <strong>${C}</strong><br/>
        This application was submitted via <a href="https://www.eyetest.co.uk/get-listed" style="color: #0ea5a0;">eyetest.co.uk/get-listed</a>.
      </p>
    </div>

  </div>
</div>`,T=`
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
  <div style="background: #0d1b3e; padding: 24px 32px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: #fff; font-size: 22px; margin: 0;">Thank you for your application</h1>
    <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 8px 0 0;">eyetest.co.uk</p>
  </div>

  <div style="border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
    <p style="font-size: 15px; line-height: 1.7; margin-top: 0;">
      Hi ${o},
    </p>
    <p style="font-size: 15px; line-height: 1.7;">
      Thank you for applying to get <strong>${t}</strong> listed on eyetest.co.uk. We&rsquo;ve received your details and our team is reviewing your application.
    </p>

    <div style="background: #f0fdfa; border-left: 4px solid #0ea5a0; border-radius: 0 8px 8px 0; padding: 20px; margin: 24px 0;">
      <h3 style="font-size: 15px; color: #0d1b3e; margin: 0 0 12px;">What happens next?</h3>
      <ol style="font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px; color: #555;">
        <li>Our team will review your application (usually within 2 business days)</li>
        <li>We&rsquo;ll be in touch to discuss your listing options and choose the right tier for your practice</li>
        <li>Once set up, your listing goes live and patients in your area can find and book with you</li>
      </ol>
    </div>

    <p style="font-size: 15px; line-height: 1.7;">
      You can view your application status any time at:
    </p>
    <p style="text-align: center; margin: 20px 0;">
      <a href="https://www.eyetest.co.uk/get-listed/thank-you?listing_id=${C}" style="display: inline-block; background: #0ea5a0; color: #fff; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 999px; text-decoration: none;">
        View Your Application
      </a>
    </p>

    <p style="font-size: 15px; line-height: 1.7;">
      If you have any questions in the meantime, just reply to this email or contact us at
      <a href="mailto:hello@eyetest.co.uk" style="color: #0ea5a0;">hello@eyetest.co.uk</a>.
    </p>

    <p style="font-size: 15px; line-height: 1.7; margin-bottom: 0;">
      Best regards,<br/>
      <strong>The eyetest.co.uk Team</strong>
    </p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
    <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
      eyetest.co.uk &mdash; The UK&rsquo;s Eye Test Comparison Platform<br/>
      <a href="https://www.eyetest.co.uk" style="color: #0ea5a0;">www.eyetest.co.uk</a>
    </p>
  </div>
</div>`,N=process.env.GMAIL_USER,S=process.env.GMAIL_APP_PASSWORD;if(!N||!S)return console.error("GMAIL_USER or GMAIL_APP_PASSWORD not set"),m.NextResponse.json({success:!0,listing_id:C});let O=b.default.createTransport({service:"gmail",auth:{user:N,pass:S}});return await O.sendMail({from:`"eyetest.co.uk" <${N}>`,to:"hello@eyetest.co.uk",replyTo:r,subject:`Listing Application — ${t} (${p||"1"} location${"1"===p?"":"s"})`,html:P}),await O.sendMail({from:`"eyetest.co.uk" <${N}>`,to:r,subject:"Thanks for your application — eyetest.co.uk",html:T}),m.NextResponse.json({success:!0,listing_id:C})}catch(e){return console.error("Get-listed submission error:",e),m.NextResponse.json({error:"Internal server error"},{status:500})}}e.s(["POST",0,w],79675);var R=e.i(79675);let A=new t.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/get-listed/route",pathname:"/api/get-listed",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/Documents/Claude/Projects/eyetest.co.uk/src/app/api/get-listed/route.ts",nextConfigOutput:"",userland:R,...{}}),{workAsyncStorage:$,workUnitAsyncStorage:k,serverHooks:E}=A;async function C(e,t,r){r.requestMeta&&(0,i.setRequestMeta)(e,r.requestMeta),A.isDev&&(0,i.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let m="/api/get-listed/route";m=m.replace(/\/index$/,"")||"/";let b=await A.prepare(e,t,{srcPage:m,multiZoneDraftMode:!1});if(!b)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:v,deploymentId:w,params:R,nextConfig:$,parsedUrl:k,isDraftMode:E,prerenderManifest:C,routerServerContext:_,isOnDemandRevalidate:P,revalidateOnlyGenerated:T,resolvedPathname:N,clientReferenceManifest:S,serverActionsManifest:O}=b,I=(0,s.normalizeAppPath)(m),q=!!(C.dynamicRoutes[I]||C.routes[N]),M=async()=>((null==_?void 0:_.render404)?await _.render404(e,t,k,!1):t.end("This page could not be found"),null);if(q&&!E){let e=!!C.routes[N],t=C.dynamicRoutes[I];if(t&&!1===t.fallback&&!e){if($.adapterPath)return await M();throw new y.NoFallbackError}}let z=null;!q||A.isDev||E||(z="/index"===(z=N)?"/":z);let U=!0===A.isDev||!q,H=q&&!U;O&&S&&(0,n.setManifestsSingleton)({page:m,clientReferenceManifest:S,serverActionsManifest:O});let j=e.method||"GET",D=(0,a.getTracer)(),L=D.getActiveScopeSpan(),F=!!(null==_?void 0:_.isWrappedByNextServer),K=!!(0,i.getRequestMeta)(e,"minimalMode"),W=(0,i.getRequestMeta)(e,"incrementalCache")||await A.getIncrementalCache(e,$,C,K);null==W||W.resetRequestCache(),globalThis.__incrementalCache=W;let B={params:R,previewProps:C.preview,renderOpts:{experimental:{authInterrupts:!!$.experimental.authInterrupts},cacheComponents:!!$.cacheComponents,supportsDynamicResponse:U,incrementalCache:W,cacheLifeProfiles:$.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,o,r,i)=>A.onRequestError(e,t,r,i,_)},sharedContext:{buildId:v,deploymentId:w}},G=new d.NodeNextRequest(e),V=new d.NodeNextResponse(t),Y=l.NextRequestAdapter.fromNodeNextRequest(G,(0,l.signalFromNodeResponse)(t));try{let i,n=async e=>A.handle(Y,B).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let o=D.getRootSpanAttributes();if(!o)return;if(o.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${o.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=o.get("next.route");if(r){let t=`${j} ${r}`;e.setAttributes({"next.route":r,"http.route":r,"next.span_name":t}),e.updateName(t),i&&i!==e&&(i.setAttribute("http.route",r),i.updateName(t))}else e.updateName(`${j} ${m}`)}),s=async i=>{var a,s;let d=async({previousCacheEntry:o})=>{try{if(!K&&P&&T&&!o)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let a=await n(i);e.fetchMetrics=B.renderOpts.fetchMetrics;let s=B.renderOpts.pendingWaitUntil;s&&r.waitUntil&&(r.waitUntil(s),s=void 0);let d=B.renderOpts.collectedTags;if(!q)return await (0,u.sendResponse)(G,V,a,B.renderOpts.pendingWaitUntil),null;{let e=await a.blob(),t=(0,g.toNodeOutgoingHttpHeaders)(a.headers);d&&(t[x.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let o=void 0!==B.renderOpts.collectedRevalidate&&!(B.renderOpts.collectedRevalidate>=x.INFINITE_CACHE)&&B.renderOpts.collectedRevalidate,r=void 0===B.renderOpts.collectedExpire||B.renderOpts.collectedExpire>=x.INFINITE_CACHE?void 0:B.renderOpts.collectedExpire;return{value:{kind:f.CachedRouteKind.APP_ROUTE,status:a.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:o,expire:r}}}}catch(t){throw(null==o?void 0:o.isStale)&&await A.onRequestError(e,t,{routerKind:"App Router",routePath:m,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:P})},!1,_),t}},l=await A.handleResponse({req:e,nextConfig:$,cacheKey:z,routeKind:o.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:C,isRoutePPREnabled:!1,isOnDemandRevalidate:P,revalidateOnlyGenerated:T,responseGenerator:d,waitUntil:r.waitUntil,isMinimalMode:K});if(!q)return null;if((null==l||null==(a=l.value)?void 0:a.kind)!==f.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(s=l.value)?void 0:s.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});K||t.setHeader("x-nextjs-cache",P?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),E&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,g.fromNodeOutgoingHttpHeaders)(l.value.headers);return K&&q||p.delete(x.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,h.getCacheControlHeader)(l.cacheControl)),await (0,u.sendResponse)(G,V,new Response(l.value.body,{headers:p,status:l.value.status||200})),null};F&&L?await s(L):(i=D.getActiveScopeSpan(),await D.withPropagatedContext(e.headers,()=>D.trace(p.BaseServerSpan.handleRequest,{spanName:`${j} ${m}`,kind:a.SpanKind.SERVER,attributes:{"http.method":j,"http.target":e.url}},s),void 0,!F))}catch(t){if(t instanceof y.NoFallbackError||await A.onRequestError(e,t,{routerKind:"App Router",routePath:I,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:P})},!1,_),q)throw t;return await (0,u.sendResponse)(G,V,new Response(null,{status:500})),null}}e.s(["handler",0,C,"patchFetch",0,function(){return(0,r.patchFetch)({workAsyncStorage:$,workUnitAsyncStorage:k})},"routeModule",0,A,"serverHooks",0,E,"workAsyncStorage",0,$,"workUnitAsyncStorage",0,k],26941)}];

//# sourceMappingURL=1f_5_next_dist_esm_build_templates_app-route_02775qx.js.map