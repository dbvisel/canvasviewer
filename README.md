# canvas collage demo

Demo done in React to demonstrate how a JSON data format could be used to present "canvases" of embedded items/sections of items from the Internet Archive, interleaved, if desired, with comments. This is done in React because that was an easy way to get a demo off the ground; it could be made in anything.

This uses the JSON data stored in `/src/assets/canvasData.js` to build canvases based on what's in that data – that includes some basic documentation of the format. A demo deployment of this can be seen at https://canvasviewer.netlify.app.

To run this locally, _npm install_, then _npm start_. Build with _npm run build_.

Still images are generated with a build step: _npm run make-images_, which screenshots all the images and puts them in _/public/images_.

## Issues

 - Throbbers aren't wonderful.
 - Dragging isn't wonderful & I suspect there's something buggy in my implementation of it.
   - Why can you drag some things but not others?		
 - Performance isn't wonderful because it's a bunch of iframes! 
 - My dummy script to generate screenshots isn't great at all.

## Demo needs

 - This is fake content and not actually compelling! 
 - add additional embed types:
   - image carousel? Is that essential?
 - phone presentation mode
   - force presentation mode on vw < 767px?
 - next/prev points probably need names (for multiple previous/next points) 
   - need to deal with this in graph mode!

## Todo/Features to consider:

 - link to a particular point
 - when a point is selected, auto-center the canvas?
   - this is kind of being done, but not very effectively
 - arrow keys for moving through present mode
   - what happens if more than one next/prev?
 - comments could be richtext/markdown?
 - could add rotation/colors/CSS styles to points
 - smarter default placement on canvas – avoid overlap
 - Internet Archive URL scheme: right now this is just taking the embed link and not processing that in any way. We could turn, for example, "1up" or "2up" in the book reader into a separate parameter.
 - maybe different visualizations?
   - CSS grid

## Remember/reference

 - Embedding on Internet Archive: https://archive.org/help/video.php
   - note that contains instructions on playlists 