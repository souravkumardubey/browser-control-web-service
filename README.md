A simple nodejs web service that allows one to interact with two web-browsers, chrome and firefox

First browser can start / stop other browser with. URL, cleanup cache, history etc and get current active tab(assuming one window). RESTful web service is to be implemented.

Features:
- start - http://<Server>/start?browser=chrome&url=http://example.com should open google chrome and open http://example.com on the same.

- stop - http://<Server>/stop?browser=<browser> should stop the given browser if it is running

- Get active tab - http://<Server>/getUrl?browser=<browser> should get the current active tab url from the given browser

- Cleanup - http://<Server>/cleanup?browser=<browser> should cleanup the browsing session if the browser has not been stopped
