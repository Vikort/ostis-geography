/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/
// Меняем везде Example на свое
#include "SearchEstatesByDistrictModule.hpp"

SC_IMPLEMENT_MODULE(SearchEstatesByDistrictAgentModule)

sc_result SearchEstatesByDistrictAgentModule::InitializeImpl()
{
  m_SearchEstatesByDistrictService.reset(new SearchEstatesByDistrictAgentPythonService("SearchEstatesByDistrictAgent/SearchEstatesByDistrictModule.py")); // тут указывается путь к модулю на python от папки problem-solver/py/services
  m_SearchEstatesByDistrictService->Run();
  return SC_RESULT_OK;
}

sc_result SearchEstatesByDistrictAgentModule::ShutdownImpl()
{
  m_SearchEstatesByDistrictService->Stop();
  m_SearchEstatesByDistrictService.reset();
  return SC_RESULT_OK;
}
