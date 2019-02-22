# Checklist for Northcoders News - Front End

## README

- [ ] provides general info about app
- [ ] clear instructions on how to run locally
- [ ] link to API & back end repo
- [ ] specifies minimum versions
- [x] `package.json` includes dependencies
- [x] deployed

## UX

- [x] Basic styling added
- [x] Responsive design
- [x] Items aligned
- [x] Content legible (not too wide, obstructed, etc)
- [x] Refreshing doesn’t cause an issue on sub-pages
- [x] No errors in the console
- [x] Login / Votes / Posts / Deletions happen instantly _OR_ give user indication of loading

## Functionality

- [x] Some way to log in (should be very obvious to hiring partners)
- [x] Some indication of who is logged in
- [x] A way to log out
- [x] Serves all articles / top articles
- [x] Can vote on articles
- [x] Can vote a maximum of once in either direction per page load
- [x] Votes are persistent when page is refreshed
- [x] Topic pages load only relevant articles (especially when navigating from one topic page to another)
- [x] Individual articles are served with comments
- [x] Can vote on comments
- [x] New comments are persistent
- [x] Can only delete comments of logged in user
- [x] Deleted comments don’t re-appear on re-render/refresh
- [x] Can post an article
- [x] User page
- [x] Users page

## Error Handling

- [x] Error pages
- [x] All errors handled

## Code

- [x] Well named components
- [x] Functional components used where possible
- [x] `node_modules` git ignored
- [x] Components reused where possible (`Articles` / `Voter`...)
- [x] Functions are DRY (`handleChange` for controlled components / api calls)
- [x] Uses object destructuring where possible
- [x] prop-types
- [x] No `console.log`s / comments **do a quick search in vscode to get rid**
- [ ] Pagination & filtering by topic & sorting **we have just discussed briefly**

## MAKE SURE ALL TESTS ARE STILL PASSING IN BACK END

## Stuff to add if you have time (should make new branches for these changes & merge when ready)

- [ ] Add integration tests with `cypress`
- [ ] Make sure any code that can be extracted from components is extracted and tested with `Jest`
- [ ] Use `aXe` extension to check for a11y issues
- [ ] Use Context API for sharing logged in user amongst components
- [ ] Add search functionality
