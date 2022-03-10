/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "FindBusStationModule.hpp"

SC_IMPLEMENT_MODULE(FindBusStationModule)

sc_result FindBusStationModule::InitializeImpl()
{
  m_FindBusStationService.reset(new FindBusStationAgentPythonService("FindBusStationAgent/FindBusStationModule.py"));
  m_FindBusStationService->Run();
  return SC_RESULT_OK;
}

sc_result FindBusStationModule::ShutdownImpl()
{
  m_FindBusStationService->Stop();
  m_FindBusStationService.reset();
  return SC_RESULT_OK;
}