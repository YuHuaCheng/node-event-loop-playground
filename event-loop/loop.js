// node myFile.js

// New timers, tasks, operations are recorded from myFile running
const pendingTimers = [];
const pendingOSTasks = []; // OS async stuff, https request, ...
const pendingOperations = []; // any task that runs in threadpool fits in here

// the content of myFile will be processed and executed before the event loop
// myFile.runContents();

function shouldEventLoopContinue(){
    // Check one: Any pending setTimeout, setInterval, setIntermediate?
    // Check two: Any pending OS tasks? (like server listenning to port)
    // Check three: Any pending long running operations? (like fs module)

    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length
}

// Entire body executes in one 'tick'
while(shouldEventLoopContinue()) { // event loop
    // 1) Node looks at pendingTimers and sees if any functions are ready to be called -> setTimeout, setInterval

    // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks (pretty much 99% of our Node code)

    // 3) Pause execution. Continue when...
    // - a new pendingOSTask is done
    // - a new pendingOperations is done
    // - a timer is about to complete

    // 4) Look at pendingTimers, call setIntermediate

    // 5) Handle any 'close' events
}


// exit back to terminal