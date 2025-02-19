Milestone 04 - Final Project Documentation
===

NetID
---
rka6631

Name
---
Reginald Kotey Appiah-Sekyere

Repository Link
---
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas

URL for deployed site 
---
http://linserv1.cims.nyu.edu:34749/

URL for form 1 (from previous milestone) 
---
http://linserv1.cims.nyu.edu:34749/login
http://linserv1.cims.nyu.edu:34749/register

Special Instructions for Form 1
---
(
    You need to use a unique username
)

URL for form 2 (from previous milestone) 

http://linserv1.cims.nyu.edu:34749/profile-Rekas/selling
---
http://linserv1.cims.nyu.edu:34749/profile-Rekas/selling(for me it is /profile-Rekas but for you it will be your username)

Special Instructions for Form 2
---
(
    First register and get to the home page.
    Click on the profile picture on the top right.
    Click on selling(this should display your selling list ...since you have nothing in there it might look empty.)
    click the add button and fill the form 2.
    On completing the form and clicking done, you should see it in your selling list.
    You should see the item added to your shopping list and the main list.
)

URL for form 3 (from previous milestone) 
---
http://linserv1.cims.nyu.edu:34749/profile-Rekas/selling
http://linserv1.cims.nyu.edu:34749/profile-Rekas/shopping

Special Instructions for Form 3
---
(
    When you click on your profile in the home and you land on the above links, your profile info would be on the right.
    You can edit these details by clicking on the edit button and filling in the form
    Then you save. 
)
First link to github line number(s) for constructor, HOF, etc.
---
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/server/auth.js
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/server/setters.js
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/server/getters.js
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/server/app.mjs

Second link to github line number(s) for constructor, HOF, etc.
---
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/client/src/views/Home.jsx
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/client/src/components/Navbar.jsx

Short description for links above
---
(
    For the first link, it is the whole backend organization research I did. I export various functions as constructors and use then in app.mjs to do things like getUsers or getItems
    
    For the second link, it is the idea of passing the setState down to the child of a component to allow changes in one child to affect view in another child which I figured out by doing some research (Lifting State Up);
)

Link to github line number(s) for schemas (db.js or models folder)
---
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/server/db.mjs

Description of research topics above with points
---
3 points - Used built tools / task runners (Vite)
2 points - Used a CSS framework(TailWindCSS)
6 points - Used a front-end framework(React)
4 points - Used a server-side JavaScript library(jwt, multer)
4 points - Used a client-side JavaScript library(Axios, React-Router-DOM)

Links to github line number(s) for research topics described above (one link per line)
---
Using Vite, https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/client/package.json
Using TailWind, https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/client/tailwind.config.js(used it throughout the whole project)
Using React, https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/client/package.json
Using jwt, https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/server/auth.js
Using multer, https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/server/app.mjs
Using Axios, (Due to preventing code from affecting configuration in linserv when i pull I do not have it on github but this is it {{
    import axios from 'axios';

    const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,            
    headers: {
        'Content-Type': 'application/json', 
    },
    timeout: 5000, 
    });

    export default api;
}})
Using React-Router-Dom, https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/client/src/App.jsx
Optional project notes 
--- 

(
    there is one more form for edditing Items you wanted to sell. View the Item in your selling cart.
)

Attributions
---
Using multer, https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/server/app.mjs, Image storage code based on , https://www.freecodecamp.org/news/simplify-your-file-upload-process-in-express-js/
Using jwt, https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-itsRekas/blob/master/server/auth.js, code inspired from https://www.youtube.com/watch?v=mbsmsi7l3r4&t=501s,https://www.youtube.com/watch?v=dX_LteE0NFM&t=70s