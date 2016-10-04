## Website Performance Optimization portfolio project

To optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques I've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

### Optimizations
- reduced the size of images.
- used async attribute in script tags.
- reduced crp length by using defer and async.
- Removed forced synchronous layout by removing the layout triggring code from the `views/js/main.js`.

## How to run
- Go into the project directory.
- open the terminal/cmd.
- Run `python -m SimpleHTTPServer 3000` for python 2 user and `python -m http.server 3000` for python 3 user.
- Now open the browser go to `localhost:3000`.