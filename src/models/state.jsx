

var State = {
        "Invalid":"media.player.state.invalid",
	    "Playing"   : "media.player.state.playing",
	    "Stop"   : "media.player.state.stop",
	    "Ready"  : "media.player.state.ready",
	    "Pause"  : "media.player.state.pause",
	    "Close"  : "media.player.state.close",
	    "Ended"  : "media.player.state.ended",
	    valid:(function(state){
            if(this[state]) return true;
            return false;
	    })
}

module.exports = State;