import {Theme, withStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const CustomTooltip = withStyles((theme: Theme) => ({
   tooltip: {
      fontSize: 12,
   },
}))(Tooltip);

export default CustomTooltip