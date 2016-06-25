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

        // spec to test that each feed contains a 'url' property and that
        // the length of this property is at least 1
        it('should have a non-empty url property', function() {
            allFeeds.forEach(function (singleFeed) {
                expect(singleFeed.url).toBeDefined();
                expect(singleFeed.url.length).not.toBe(0);
            });
        });

        // spec to test that each feed contains a 'name' property and that
        // the length of this property is at least 1
        it('should have a non-empty name property', function() {
            allFeeds.forEach(function (singleFeed) {
                expect(singleFeed.name).toBeDefined();
                expect(singleFeed.name.length).not.toBe(0);
            });
        });
    });

    // 'The menu" test suite
    describe('The menu', function() {
        var body = $('body'),
            menuIcon = $('.menu-icon-link');

        // html inspection shows that the menu is hidden when the body
        // has class 'menu-hidden', therefore test that the body has
        // this class by default
        it('should be hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        // test that after a menu icon is clicked the body loses/gains the class
        // 'menu-hidden', which leads to menu showing/hiding (2 expectations in 1 test)
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

    describe('New Feed Selection', function() {

        // cache variables
        var feed0,
            feed1;

        // load two different feeds and assign html() to our variables, to make sure
        // that the content of feeds changes and not just title in the header (which is hardcoded)
        beforeEach(function(done) {
            loadFeed(0, function() {
                feed0 = $('.feed').html();
            });

            loadFeed(1, function() {
                feed1 = $('.feed').html();
                done();
            });
        });

        // test that the two feeds' html() is different, therefore content changes
        it('should change the content after a new feed is loaded', function() {
            expect(feed0).not.toEqual(feed1);
        });
    });

    // additional suite for testing a newly implemented feeds filter
    describe('Feeds filter', function() {

        // cache variables
        var feed = $('.feed'),
            filterInput = $('.feed-filter');

        // load the first feed
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // check that all but the first feeds are filtered out
        it('should filter out feeds that don\'t match the search', function() {

            // set filter field value to the first feed h2 text value,
            // so all other feeds are filtered out
            filterInput.val(feed.find('h2').first().text());
            filterInput.trigger('change');

            feed.find('.entry-link:nth-child(n+2)').each(function() {
                expect($(this).hasClass('filtered')).toBe(true);
            });
        });

        // test that all feeds are visible when input is empty
        it('should show all feeds when input value is empty', function() {

            // set input value to empty
            filterInput.val('');
            expect($('.entry-link.filtered').length).toBe(0);
        });
    });
}());
