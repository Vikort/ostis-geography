/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "DistrictSearchModule.hpp"

SC_IMPLEMENT_MODULE(DistrictSearchModule)

sc_result DistrictSearchModule::InitializeImpl()
{
  m_DistrictSearchService.reset(new DistrictSearchAgentPythonService("DistrictSearchAgent/DistrictSearchModule.py"));
  m_DistrictSearchService->Run();
  return SC_RESULT_OK;
}

sc_result DistrictSearchModule::ShutdownImpl()
{
  m_DistrictSearchService->Stop();
  m_DistrictSearchService.reset();
  return SC_RESULT_OK;
}
