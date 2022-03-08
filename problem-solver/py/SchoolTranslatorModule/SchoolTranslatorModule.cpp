/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "SchoolTranslatorModule.hpp"

SC_IMPLEMENT_MODULE(SchoolTranslatorModule)

sc_result SchoolTranslatorModule::InitializeImpl()
{
  m_SchoolTranslatorService.reset(new SchoolTranslatorPythonService("SchoolTranslatorModule/SchoolTranslatorModule.py"));
  m_SchoolTranslatorService->Run();
  return SC_RESULT_OK;
}

sc_result SchoolTranslatorModule::ShutdownImpl()
{
  m_SchoolTranslatorService->Stop();
  m_SchoolTranslatorService.reset();
  return SC_RESULT_OK;
}