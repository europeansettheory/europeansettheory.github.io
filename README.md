# ESTS_webpage

## Front-end 
The fron-end consist of three kind of files images, CSS, and HTML. The front-end of the webpage is design as mobile-first, meaning that every functionality and content added to the front-end is added and implemented first to the mobile version, later on it is adapted to the tablet version, at the end it is adapted to the desktop version. The front-end must be tested in different devices and different browsers.

## CSS
The CSS files are style.css, tablet.css, and desktop.css. Other css file might be added in the future, this should be a solution to wrong implementation of the webpage for the different sizes of the screen.

### style.css
The style.css is the main style file, every change must be added to this file first unless it is an specific change to the tablet or destop version. As a mobile-first, the main style file is the mobile style file. 

### tablet.css
The tablet.css is the style for the tablet version of the webpage. This version has to take care of two cases, the webpage from a tablet device and the webpage on half-screen on a desktop device. Therefore this version has to take into account more functionalities than the other version (e.g. by click and by hover).

### desktop.css
The desktop.css is the style for the desktop version. This is the last version in which a change is implemented.

## HTML

THe HTML files must have the least amount of JS (implemented only when it is neccessarly and cannot be done by CSS, HTML or by scripts in the back-end). All files have to have the same style. The home or landing page is index.html. Every page must have a link to all the other pages, and no link to itself.

## Back-end of the new webpage
The back-end of this project is local, no interaction with the user is expected. It is a static webpage. The back-end consist of csv files and python script. The functionality of these are to allow the webmaster to update the webpage through the scripts, this includes update news in all the html files, obtain information of external APIs, update the upcoming and past talks, etc.
