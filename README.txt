Dear future webmaster,

Hello from the 2020/2021 webmaster, hopefully you know node.js and don't use
shitty PHP.

The app.js file is the server which renders the website using ejs.

All the website HTML is found in the public folder along with the css and
front-end js. All the js in the app.js file is commented and hopefully it's
simple enough.

The contact page is weird. I couldn't get my node server to send an email when
it was hosted on the schools servers so i created a separate server which just
took a post request from the form of the ece.skule.ca contact page
(found in public folder) then that server sent an email to ece@skule.ca and
redirected the user back to the ece.skule.ca. Sorry if that is inconvenient. I
plan to add the code for that server here eventually I'm just too lazy to do it
right now. If i forget email me.

Also, in order for the ece.skule.ca to direct to the node server, you have to
set the port of the node server in the HTACCESS file in public_html folder in
cpanel.

Also, to start the server cd over to myapp from Terminal in cpanel and run
'forever start app.js' to end the server run 'forever stop app.js'.

For any help/ questions email me at majdhailat64@gmail.com

Best,

Majd
