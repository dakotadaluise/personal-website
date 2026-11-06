# Personal Website - DS4200 HW7

Dakota Daluise's personal website for Homework 7.

## Pages

- `index.html` - home page: main heading, intro about me, a photo, a list, and my contact info
- `volleyball.html` - second page: writing about volleyball, an image, two lists, and a D3 bar chart

## Other files

- `styles.css` - all of the styling for both pages
- `chart.js` - the D3 code that draws the bar chart on the volleyball page
- `data/volleyball-popularity.csv` - the data for the chart (made up for this assignment)
- `images/` - the pictures used on the two pages

## Running it on my computer

The chart loads a CSV file, and browsers block that when you just double-click the
HTML file. So I run a small server from this folder instead:

```
python3 -m http.server 8000
```

Then I open http://localhost:8000 in my browser. (The Live Server extension in
VS Code works too.)

## Putting it on GitHub Pages

1. Push this folder to a public GitHub repo.
2. On GitHub go to Settings > Pages.
3. Under Source pick "Deploy from a branch", then `main` and `/ (root)`, and save.
4. After a minute the site is at `https://dakotadaluise.github.io/<repo-name>/`.
