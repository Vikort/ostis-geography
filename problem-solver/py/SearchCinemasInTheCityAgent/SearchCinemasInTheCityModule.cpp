/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "SearchCinemasInTheCityModule.hpp"

SC_IMPLEMENT_MODULE(SearchCinemasInTheCityModule)

sc_result SearchCinemasInTheCityModule::InitializeImpl()
{
  m_SearchCinemasInTheCityService.reset(new SearchCinemasInTheCityAgentPythonService("SearchCinemasInTheCityAgent/SearchCinemasInTheCityModule.py"));
  m_SearchCinemasInTheCityService->Run();
  return SC_RESULT_OK;
}

sc_result SearchCinemasInTheCityModule::ShutdownImpl()
{
  m_SearchCinemasInTheCityService->Stop();
  m_SearchCinemasInTheCityService.reset();
  return SC_RESULT_OK;
}
