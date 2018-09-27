function getReactInstance(node) {
  	if (!node) return null;
  	return node[Object.keys(node).find((key) => key.startsWith("__reactInternalInstance"))];
};

function getInstance(config) {
  	if (config === undefined) return null;
  	if (!config.node || (!config.name && (!config.props || !Array.isArray(config.props)))) return null;
  	var inst = getReactInstance(config.node);
  	if (!inst) return null;
  	var depth = -1;
  	var maxDepth = config.depth === undefined ? 15 : config.depth;
  	var upwards = config.up === undefined ? false : config.up;
  	var start = performance.now();
  	var maxTime = config.time === undefined ? 150 : config.time;

  	var keyWhiteList = upwards ? {"return":true,"sibling":true} : {"child":true,"sibling":true};

  	return searchOwnerInReact(inst);

  	function searchOwnerInReact (ele) {
  		depth++;
  		if (!ele || getReactInstance(ele) || depth > maxDepth || performance.now() - start > maxTime) result = null;
  		else {
  			var keys = Object.getOwnPropertyNames(ele);
  			var result = null;
  			for (var i = 0; result == null && i < keys.length; i++) {
  				var key = keys[i];
  				var value = ele[keys[i]];

  				if (config.name && ele.type && (ele.type.displayName === config.name || ele.type.name === config.name)) {
  					result = ele.stateNode;
  				}
  				else if (config.props && ele.stateNode && config.props.every(prop => ele.stateNode[prop] !== undefined)) {
  					result = ele.stateNode;
  				}
  				else if ((typeof value === "object" || typeof value === "function") && keyWhiteList[key]) {
  					result = searchOwnerInReact(value);
  				}
  			}
  		}
  		depth--;
  		return result;
  	}
};

function sendMessage(element){
  		var press = new KeyboardEvent("keypress", {key: "Enter", code: "Enter", which: 13, keyCode: 13, bubbles: true});
  		Object.defineProperty(press, "keyCode", {value: 13});
  		Object.defineProperty(press, "which", {value: 13});
  		element.dispatchEvent(press);
};

function addSyntaxColor(element, message, language){

    message = "```" + language + "\n" + message + "\n```";
    getInstance({"node":element, "name":"ChannelTextAreaForm", "up":true}).setState({textValue:message});
  }
};
