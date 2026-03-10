import UserMaster from './TreeView/UserMaster'
import MenuNameMaster from './TreeView/MenuNameMaster'
import NavigationMaster from './TreeView/NavigationMaster'
import TreeViewMaster from './TreeView/TreeViewMaster'
import UserRights from './TreeView/UserRights'

const TreeViewRoutes = [
{ path:"/UserMaster"           ,element:<UserMaster            title="UserMaster"          subTitle="Details"  />},
{ path:"/MenuNameMaster"       ,element:<MenuNameMaster        title="MenuNameMaster"      subTitle="Details"  />},
{ path:"/NavigationMaster"     ,element:<NavigationMaster      title="NavigationMaster"    subTitle="Details"  />},
{ path:"/TreeViewMaster"       ,element:<TreeViewMaster        title="TreeViewMaster"      subTitle="Details"  />},
{ path:"/UserRights"           ,element:<UserRights            title="UserRights"          subTitle="Details"  />},

];

export default TreeViewRoutes;