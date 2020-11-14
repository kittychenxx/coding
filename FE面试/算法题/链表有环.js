var hasCycle = function(head) {
    if(head===null||head.next===null){
        return false;
    }
    let fast=head.next;
    let low=head;
    while(fast!==low){
        if(fast==null||fast.next==null){return false;}
        fast=fast.next.next;
        low=low.next;
    }
    return true;
};