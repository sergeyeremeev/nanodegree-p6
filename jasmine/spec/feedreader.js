/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('should have a non-empty url property', function() {
            allFeeds.forEach(function (singleFeed) {
                expect(singleFeed.url).toBeDefined();
                expect(singleFeed.url.length).not.toBe(0);
            });
        });

        it('should have a non-empty name property', function() {
            allFeeds.forEach(function (singleFeed) {
                expect(singleFeed.name).toBeDefined();
                expect(singleFeed.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', function() {
        var body = $('body'),
            menuIcon = $('.menu-icon-link');

        it('should be hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        it('should change visibility on menu icon click', function() {
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });
    
    
    describe('Initial Entries', function() {
        // the spec will start only after the done function is called
        // in the call to beforeEach which allows to test when async work is complete
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // spec to test that there is at least 1 .entry element inside .feed container
        // after the async work was done
        it('should have at least one entry', function() {
            expect($('.feed').find('.entry').length).not.toBe(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
