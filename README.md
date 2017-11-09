 # Kryeion

A mid-sized CSS library for quick application of custom UI styles. However, it depends on the classes generated by **Modernizr** and **Browsengine** JavaScript libraries to function well. Much like [**Bulma.io**](https://www.github.com/jgthms/bulma) or [**Bootstrap**](https://www.github.com/twbs/bootstrap), it also supports both **float-based** and **flexbox-based** layouts (not at the same time) and widgets. It also comes in a modular structure and is geared towards _progressive enhancement_ with support for browsers like _old IE_, _old Firefox_ and _Opera Mini_. It also has **utility and helper classes** for quick but apt UI effects e.g. flipping an element (on its horizontal/vertical axis) 90 degrees or having a fancy header.

## About

Kryeion makes it really easy to create custom widgets and simple no-tween effects by simply adding a class or set of classes to your HTML. It's really that simple. It works great with (and actually depends on) both [**Modernizr**](https://github.com/Modernizr/Modernizr) and [**Browsengine**](https://github.com/isocroft/browsengine). With Kryeion, we are still investigating the viability of eliminating JS feature/engine detection dependencies using the new <u style="color:indigo;"><b>@supports</b></u> _conditional at-rule_ for feature/engine detection. Therefore, it's important to note that this CSS library is still in active development with lots of experimentation going on. However, this project is commited to building out a **beta release** and **candidate recommendation** in the coming months. Finally, Kryeion is written with a lot of cutting-edge best practice owing to its' use of OOCSS ([**Object-Oriented CSS**](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)) CSS Methodology and ITCSS ([**Inverted Triangle of CSS**](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)) Code Architecture and a pre-compiler SASS.

## How to Use

```html
<html class="full-height">
    <head>
        <link rel="stylesheet" media="screen" href="path/to/kryeion.css">
       <!-- The 2 scripts below HAVE TO be included for kryeion to work -->
        <script src="path/to/browsengine.js" type="text/javascript"></script>
        <script src="path/to/modernizr.js" type="text/javascript"></script>
    </head>
    <body>
    
     <div class="kr-boxing">
       <div class="kr-row">
        <div class="kr-column column-four">
        <article class="add-shadow">
        <section class="tile">
            <h1 class="heading-box text-centered">
                <small class="fancyheading-pane">
                        <strong class="fancyheading-pane-placeholder">New Intakes</strong> 
                </small>
            </h1>
            <div class="listings">
                    <ul class="persona-element">
                        <li>
                            <div class="persona-box">
                                <span class="persona-avatar-box">
                                    <a href="/" class="persona-avatar"><img src="" alt="Avatar" class="flexible"></a> 
                                </span>
                                <div class="persona-info">
                                    <h3>Henry Backer</h3>
                                    <p>I know about what to do and what not.</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="persona-box">
                                <span class="persona-avatar-box">
                                    <a href="/" class="persona-avatar"><img src="" alt="Avatar" class="flexible"></a> 
                                </span>
                                <div class="persona-info">
                                    <h3>Susan Flowy</h3>
                                    <p>I don't know what i think i should do.</p>
                                </div>
                            </div>
                        </li>
                    </ul>
 
                    <div clss="panel">
 
                    </div>
 
                    <div class="table">
                            <p class="table-sidetext-box">
                                 <span class="table-side-text">internals</span>
                            </p>
                            <table class="table-as-grid" summary="This is a table of costs and balances">
                                   <caption>Figure 1.0</caption>
                                   <thead>
                                         <tr>
                                            <th>S/N</th>
                                         </tr>
                                   </thead>
                                   <tbody>
                                          <tr>
                                              <td>1</td>
                                         </tr>
                                   </tbody>
                            </table>
                     </div>

                    <div class="card">
                             <div class="card-figure">
                                  <figure class="card-figure-content" data-aspect-ratio="4by3">
                                      <img src="http://via.placeholder.com/1250x1050" alt="">
                                  </figure>
                             </div>
                             <div class="card-descripton">
                                 <div class="card-content">
                                    <div class="persona-box">
                                         <span class="persona-avatar-box">
                                             <a href="/" class="persona-avatar"><img src="" alt="Avatar" class="flexible"></a> 
                                         </span>
                                        <div class="persona-info">
                                            <h3>Susan Flowy</h3>
                                            <p>I don't know what i think i should do.</p>
                                        </div>
                                    </div>
                                  </div>
                             </div>
                        </div> 
                   </div>
 
 
                    <nav class="nav">
                          <ul class="nav-menu">
                                 <li class="nav-menu-item"><a href="javascript:void(0);" class="nav-menu-item-button"></a></li>
                          </ul>
                   </nav>

                   <div class="button-pack">
                        <section class="button-sub-pack kr-spaced">
                              <a href="javascript:void(0);" class="button kr-gradiented">
                                  Dropping
                              </a>
                              <div class="button-dropdown">
                                   <ul class="button-dropdown-menu">
                                      <li><a href="#">Item 1</a></li>
                                      <li><a href="#">Item 2</a></li>
                                   </ul>
                              </div>
                         </section>
                         <section class="button-sub-pack kr-spaced">
                              <button class="button kr-gradiented">
                                  All Notifications
                              </button>
                              <div class="button-dropdown">
                                   <ul class="button-dropdown-menu" data-empty-text="No Notifications!"><!-- List is Empty --></ul>
                              </div>
                         </section>
                   </div>
            </section>
           </article>
           </div>
           <div class="kr-column column-eight"> 
                <nav class="tab-box anchor-right">
                    <ul class="tab tab-pinned">
                        <li class="tab-item">
                            <a href="javascript:void(0);" class="tab-item-button active-item"><span class="tab-text-sup">Up Votes</span><b class="text-sub">5</b></a>
                        </li>
                        <li class="tab-item">
                            <a href="javascript:void(0);" class="tab-item-button"><span class="tab-text-sup">Down Votes</span><b class="text-sub">11</b></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div> 
    
    </body>
</html>
```

## Browser Support

* IE 8+
* Chrome 2+
* Firefox 3.5+
* Safari 3.1+
* Opera 9+ 

## License

MIT

## Contributing

We would love to have you contribute to this project. This project is backed by **CoolCodes** <img src="./logo-coolcodes.png">
