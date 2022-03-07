/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "SearchShopsInTheDistrictModule.hpp"

SC_IMPLEMENT_MODULE(SearchShopsInTheDistrictModule)

sc_result SearchShopsInTheDistrictModule::InitializeImpl()
{
  m_SearchShopsInTheDistrictService.reset(new SearchShopsInTheDistrictAgentPythonService("SearchShopsInTheDistrictAgent/SearchShopsInTheDistrictModule.py"));
  m_SearchShopsInTheDistrictService->Run();
  return SC_RESULT_OK;
}

sc_result SearchShopsInTheDistrictModule::ShutdownImpl()
{
  m_SearchShopsInTheDistrictService->Stop();
  m_SearchShopsInTheDistrictService.reset();
  return SC_RESULT_OK;
}
