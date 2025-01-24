---
layout: page
title: Contact
permalink: /contact/
---

<h1 class="page-heading">Contact</h1>

<div class="row">
<div class="column">
<!-- <img src="/assets/blogimages/me.jpg" alt="A photo of me" style="width: 300px;"> -->
If you’ve made it this far, we likely share a vision for meaningful work. I’m drawn to projects with a clear purpose—those that make a positive impact and foster change. I believe in collaborating with teams committed to creating a fairer, more inclusive, and sustainable world.  

If these values resonate with you, I’d love to connect and explore how we can work together to make a difference.  


</div>
<div class="column links">
<a href="mailto:cataldo.diego@gmail.com" target="_blank">Email</a>
<a href="https://github.com/catuy" target="_blank">GitHub</a>
<a href="https://cv.fadu.edu.uy/mod/data/view.php?d=6&rid=557&filter=1" target="_blank">Fadu</a>
<a href="https://www.instagram.com/c______do/" target="_blank">Instagram</a>
<a href="/assets/blogimages/resume.pdf" target="_blank">Download my full CV</a>
</div>
</div>

<h1 class="page-heading" style="margin-top:calc(var(--margin-top)*2)">This website</h1>
<div class="row">
<div class="column">
<p>
This site serves as my portfolio and personal resume, showcasing my work as a designer. It is built primarily in HTML and Markdown, preprocessed by Jekyll, and hosted globally via GitHub. You can find it and fork it for your own use on my <a href="https://github.com/catuy" target="_blank">GitHub profile</a>.
</p>
<p>
It uses the <a href="https://www.ibm.com/plex/" target="_blank">IBM Plex</a> typeface and meets the highest ADA accessibility standards, including WCAG 2.1 AA compliance, ensuring compatibility with screen readers, proper color contrast ratios, and keyboard navigability.
</p>




</div>
<div class="column">
</div>
</div>


<style>
   .column.links a{
        display: block;
        /* text-align:right; */
    }
.row {
  display: flex;
  /* flex-wrap: wrap; */
  margin-bottom: 20px;
  gap: 40px;
}

.column {
  flex: 1;
  /* padding: 10px; */
  box-sizing: border-box;
}

.row .column:first-child {
    flex: 0 0 50%; /* 25% de ancho para la columna de texto */
    padding-right: 10px;
    position: sticky;
    top: 100px; /* Sticky a 90px desde la parte superior */
    align-self: flex-start; /* Para que el sticky funcione correctamente */
    background: white; /* Fondo blanco para evitar superposiciones raras */
    z-index: 1; /* Asegura que quede por encima si se solapa con otros elementos */
  }

  .row .column:last-child {
    flex: 0 0 50%; /* 75% de ancho para la columna de imágenes/iframes */
  }


</style>