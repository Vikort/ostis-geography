/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "FindBusStationByDistrictModule.hpp"

SC_IMPLEMENT_MODULE(FindBusStationByDistrictModule)

sc_result FindBusStationByDistrictModule::InitializeImpl()
{
  m_FindBusStationByDistrictService.reset(new FindBusStationByDistrictAgentPythonService("FindBusStationByDistrictAgent/FindBusStationByDistrictModule.py"));
  m_FindBusStationByDistrictService->Run();
  return SC_RESULT_OK;
}

sc_result FindBusStationByDistrictModule::ShutdownImpl()
{
  m_FindBusStationByDistrictService->Stop();
  m_FindBusStationByDistrictService.reset();
  return SC_RESULT_OK;
}