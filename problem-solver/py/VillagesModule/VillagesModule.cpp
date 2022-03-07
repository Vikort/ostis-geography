/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "VillagesModule.hpp"

SC_IMPLEMENT_MODULE(VillagesModule)

sc_result VillagesModule::InitializeImpl()
{
  m_VillagesService.reset(new VillagesPythonService("VillagesModule/VillagesModule.py"));
  m_VillagesService->Run();
  return SC_RESULT_OK;
}

sc_result VillagesModule::ShutdownImpl()
{
  m_VillagesService->Stop();
  m_VillagesService.reset();
  return SC_RESULT_OK;
}
