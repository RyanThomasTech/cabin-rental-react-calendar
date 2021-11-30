# Cabin Rental Calendar

My family has a rental house in Maine, but the person who was previously in charge of tracking who has is going to be using it and when is no longer interested in doing that. At some point a solution that is agreeable for all family members will need to be available--so I saw this as an opportunity to relearn React and learn how to use Go as a backend.

## Current Status: Incomplete

Implemented:
* Create booking
* Read booking
* Delete booking
* Date switching

Needs a lot of visual polish. It's ugly as sin, because I haven't spent any time on the CSS.

Need to nail down when to call lifecycle methods to make rendering occur after certain user interactions.

## Lessons Learned
This was a good opportunity to start using React Hooks. I started doing that for the Sidebar (and subcomponents of Sidebar). Just useState for now--useEffect and custom hooks felt like overkill for this project. This was also the first time I've made a webserver in Go rather than Node (but that's in another repo).

## Useful Takeaway:

Date math is frustrating. Also, learn how to test in React. That way Date math might be less frustrating.