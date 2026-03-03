import React,{useEffect, useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import CountryMaster from './CountryMaster'
import StateMaster from './StateMaster'
import CityMaster from './CityMaster'
import CompanyMaster from './CompanyMaster'
import PartyMaster from './PartyMaster'
import UserMaster from '../TreeView/UserMaster'
import MenuNameMaster from '../TreeView/MenuNameMaster'
import NavigationMaster from '../TreeView/NavigationMaster'
import TreeViewMaster from '../TreeView/TreeViewMaster'
import UserRights from '../TreeView/UserRights'
import EmployeeMaster from './EmployeeMaster'
import Payment from '../Transactions/Payment'
import AdvancePayment from '../Transactions/AdvancePayment'
import BankMaster from './BankMaster'
import BranchMaster from '../Masters/BranchMaster'
import IFSCMaster from '../Masters/IFSCMaster'
import SizeMaster from '../Masters/SizeMaster'
import UTRPayment from '../Transactions/UTRPayment'
 import {DataProvider} from '../context/CreateUserContext'
import { TreeViewDataProdiver } from '../context/CreateTreeViewContext'
import Dashboard from '../Custom/Dashboard'
import ProcessMaster from './ProcessMaster'
import ColorMaster from './ColorMaster'
import BuyerMaster from './BuyerMaster'

import StyleItemMaster from './StyleItemMaster'
import StyleCategoryMaster from './StyleCategoryMaster'
import SizeGroupMaster from './SizeGroupMaster'
import StyleGroupMaster from './StyleGroupMaster'
import FabricTypeMaster from './FabricTypeMaster'
import FabricMaster from './FabricMaster'
import CountsMaster from './CountsMaster'
import YarnMaster from './YarnMaster'
import YarnBlendMaster from './YarnBlendMaster'
import BarCodeGenerate from '../Transactions/BarCodeGenerate'
import AutoGenerateMaster from '../Registration/AutoGenerateMaster'
import ProductionEntry from '../Transactions/SRG/ProductionEntry'
import AdminDashboard from '../Custom/AdminDashboard'
import CheckingEntry from '../Transactions/SRG/CheckingEntry'
import DefectEntry from '../Transactions/SRG/DefectEntry'
import axios from 'axios'

const CommonMaster = ({colorValue,titlename,handlepage,headerSidebarClose,loginUser,loginCompCode,
  menuheader,header_items,setMenuHeader,foreValue,sequenceTable,tableName,
  stateValues,setStateValues,countryValues,setCountryValues,cityValues,setCityValues,companyValues,
   setCompanyValues ,  barValues, setBarValues,addRows,setAddRows,prodValues, setprodValues,addRows1, setAddRows1,
   defectValues, setDefectValues,checkValues,setCheckValues,addRows2,setAddRows2, addRows3, setAddRows3 ,
   menuNameValues, setMenuNameValues,autoValues,setAutoValues,
   userValues,setUserValues,naviValues,setNaviValues,userRights,setUserRights, userRightValues,setUserRightValues,
  }) => {

    return (    
    <>

{/* onClick={(e)=>headerSidebarClose(false) } style={{border: `2px solid var(--bs-white)`}} */}
    
    <main >   
    
    <DataProvider  >  
    <TreeViewDataProdiver>       <Routes>       
       <Route path="/AdminDashboard"       element={<AdminDashboard menuheader={menuheader}setMenuHeader={setMenuHeader} title={titlename} handlepage={handlepage}  subTitle="Details"  colorValue={colorValue}/> }  />     
        <Route path="/Dashboard"            element={<Dashboard  menuheader={menuheader}setMenuHeader={setMenuHeader} title={titlename} handlepage={handlepage}  subTitle="Details"  colorValue={colorValue}/> }  />     
        <Route path="/CountryMaster"        element={<CountryMaster         title="CountryMaster"   subTitle="Details"  loginUser={loginUser} loginCompCode={loginCompCode}  colorValue={colorValue} countryValues={countryValues}  setCountryValues={setCountryValues} /> }  />     
        <Route path="/StateMaster"          element={<StateMaster           title="StateMaster"       subTitle="Details" loginUser={loginUser} loginCompCode={loginCompCode}  colorValue={colorValue} stateValues={stateValues} setStateValues={setStateValues} />}   />
        <Route path="/CityMaster"           element={<CityMaster            title="CityMaster"      subTitle="Details"  loginUser={loginUser} loginCompCode={loginCompCode} colorValue={colorValue} cityValues={cityValues} setCityValues={setCityValues} />} />     
        <Route path="/PartyMaster"          element={<PartyMaster           title="PartyMaster"       subTitle="Details"  colorValue={colorValue}/>} />    
        <Route path="/BankMaster"           element={<BankMaster            title="BankMaster"     subTitle="Details"  colorValue={colorValue}/>} />
        <Route path="/BranchMaster"         element={<BranchMaster          title="BranchMaster"   subTitle="Details"  colorValue={colorValue}/>} />
        <Route path="/IFSCMaster"           element={<IFSCMaster            title="IFSC Master"           subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/SizeMaster"           element={<SizeMaster            title="SizeMaster"           subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/SizeGroupMaster"      element={<SizeGroupMaster       title="SizeGroupMaster"           subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/FabricTypeMaster"     element={<FabricTypeMaster      title="FabricTypeMaster"           subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/YarnBlendMaster"      element={<YarnBlendMaster       title="YarnBlendMaster"           subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/CountsMaster"         element={<CountsMaster          title="CountsMaster"           subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/YarnMaster"           element={<YarnMaster            title="YarnMaster"           subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/FabricMaster"         element={<FabricMaster          title="FabricMaster"           subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/CompanyMaster"        element={<CompanyMaster         title="CompanyMaster"     subTitle="Details"  colorValue={colorValue} companyValues={companyValues} setCompanyValues={setCompanyValues} />} />
        <Route path="/EmployeeMaster"       element={<EmployeeMaster        title="EmployeeMaster"   subTitle="Details"  colorValue={colorValue}/>} />
        <Route path="/Payment"              element={<Payment               title="Payment"           subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/ProcessMaster"        element={<ProcessMaster         title="ProcessMaster"    subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/ColorMaster"          element={<ColorMaster           title="ColorMaster"    subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/BuyerMaster"          element={<BuyerMaster           title="BuyerMaster"    subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/StyleGroupMaster"     element={<StyleGroupMaster      title="StyleGroupMaster"    subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/StyleCategoryMaster"  element={<StyleCategoryMaster   title="StyleCategoryMaster"    subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/StyleItemMaster"      element={<StyleItemMaster       title="StyleItemMaster"    subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/BarCodeGenerate"      element={<BarCodeGenerate       title="BarCodeGenerate"         menuheader={menuheader}  subTitle="Details"  SequenceTable={sequenceTable}  loginUser={loginUser} loginCompCode={loginCompCode}   barValues={barValues} setBarValues={setBarValues} addRows={addRows} setAddRows={setAddRows}  header_items={header_items} colorValue={colorValue}  foreValue={foreValue} />} />  
        <Route path="/ProductionEntry"      element={<ProductionEntry       title="ProductionEntry"         menuheader={menuheader}  subTitle="Details"  SequenceTable={sequenceTable}         header_items={header_items} colorValue={colorValue}  foreValue={foreValue} loginUser={loginUser} loginCompCode={loginCompCode}  prodValues={prodValues} setprodValues={setprodValues} addRows1={addRows1} setAddRows1={setAddRows1} />} />  
        <Route path="/CheckingEntry"        element={<CheckingEntry         title="CheckingEntry"           menuheader={menuheader}  subTitle="Details"  SequenceTable={sequenceTable}           header_items={header_items} colorValue={colorValue}  foreValue={foreValue} loginUser={loginUser} loginCompCode={loginCompCode} checkValues={checkValues} setCheckValues={setCheckValues} addRows3={addRows3} setAddRows3={setAddRows3} />} />  
        <Route path="/DefectEntry"          element={<DefectEntry           title="DefectEntry"             menuheader={menuheader}  subTitle="Details"  SequenceTable={sequenceTable}      header_items={header_items} colorValue={colorValue}  foreValue={foreValue} loginUser={loginUser} loginCompCode={loginCompCode} defectValues={defectValues} setDefectValues={setDefectValues} addRows2={addRows2} setAddRows2={setAddRows2} />} />  
        <Route path="/AutoGenerateMaster"   element={<AutoGenerateMaster    title="AutoGenerateMaster"    subTitle="Details"  colorValue={colorValue} loginUser={loginUser} loginCompCode={loginCompCode}  autoValues={autoValues} setAutoValues={setAutoValues}/>} />  
        <Route path="/AdvancePayment"       element={<AdvancePayment        title="AdvancePayment"    subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/UTRPayment"           element={<UTRPayment            title="UTRPayment"        subTitle="Details"  colorValue={colorValue}/>} />  
        <Route path="/UserMaster"           element={<UserMaster            title="UserMaster"        subTitle="Details"  colorValue={colorValue} loginUser={loginUser} loginCompCode={loginCompCode} userValues={userValues} setUserValues={setUserValues}/>} />
        <Route path="/MenuNameMaster"       element={<MenuNameMaster        title="MenuNameMaster"        subTitle="Details"  colorValue={colorValue} loginUser={loginUser} loginCompCode={loginCompCode} menuNameValues={menuNameValues} setMenuNameValues={setMenuNameValues} />} />
        <Route path="/NavigationMaster"     element={<NavigationMaster      title="NavigationMaster"        subTitle="Details"  colorValue={colorValue} loginUser={loginUser} loginCompCode={loginCompCode} menuNameValues={menuNameValues} setMenuNameValues={setMenuNameValues} naviValues={naviValues} setNaviValues={setNaviValues}/>} />
        <Route path="/TreeViewMaster"       element={<TreeViewMaster        title="TreeViewMaster"        subTitle="Details"  colorValue={colorValue} loginUser={loginUser} loginCompCode={loginCompCode} setUserRightValues={setUserRightValues} userRightValues={userRightValues} />} />
        <Route path="/UserRights"           element={<UserRights            title="UserRights"        subTitle="Details"  colorValue={colorValue} loginUser={loginUser} loginCompCode={loginCompCode} />} /> 

     </Routes>     
      </TreeViewDataProdiver>
      </DataProvider> 

      </main>
      
      </>
  )
        
}

export default CommonMaster
