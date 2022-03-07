/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "SearchShopsInTheCityModule.hpp"

SC_IMPLEMENT_MODULE(SearchShopsInTheCityModule)

sc_result SearchShopsInTheCityModule::InitializeImpl()
{
  m_SearchShopsInTheCityService.reset(new SearchShopsInTheCityAgentPythonService("SearchShopsInTheCityAgent/SearchShopsInTheCityModule.py"));
  m_SearchShopsInTheCityService->Run();
  return SC_RESULT_OK;
}

sc_result SearchShopsInTheCityModule::ShutdownImpl()
{
  m_SearchShopsInTheCityService->Stop();
  m_SearchShopsInTheCityService.reset();
  return SC_RESULT_OK;
}
