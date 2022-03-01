/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "SearchCinemasInTheDistrictModule.hpp"

SC_IMPLEMENT_MODULE(SearchCinemasInTheDistrictModule)

sc_result SearchCinemasInTheDistrictModule::InitializeImpl()
{
  m_SearchCinemasInTheDistrictService.reset(new SearchCinemasInTheDistrictAgentPythonService("SearchCinemasInTheDistrictAgent/SearchCinemasInTheDistrictModule.py"));
  m_SearchCinemasInTheDistrictService->Run();
  return SC_RESULT_OK;
}

sc_result SearchCinemasInTheDistrictModule::ShutdownImpl()
{
  m_SearchCinemasInTheDistrictService->Stop();
  m_SearchCinemasInTheDistrictService.reset();
  return SC_RESULT_OK;
}
