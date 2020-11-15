const ENUM = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
}

class Promise {
    constructor(executor) {
        this.status = ENUM.PENDING;
        this.name = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks=[];
        executor();
        const resolve = (value) => {
            if (this.status === ENUM.PENDING) {
                this.status = FULFILLED;
                this.value = value;
            }
        }
        const reject = (reason) => {
            if (this.status === ENUM.PENDING) {
                this.status = REJECTED;
                this.reason = reason;
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        console.log(onFulfilled, onRejected)
        if (this.status == ENUM.FULFILLED) {
            onFulfilled(this.value)
        }
        if (this.status == REJECTED) {
            onRejected(this.reason);
        }
        if(this.status==ENUM.PENDING){
            this.onResolvedCallbacks.push(onFulfilled);
            this.onResolvedCallbacks.push(onRejected);
        }
    }

}
module.exports = Promise;