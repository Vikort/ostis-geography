#pragma once

#include "sc-memory/sc_module.hpp"
#include "ExampleService.hpp"
#include "ExampleModule.generated.hpp"


class ExampleModule : public ScModule
{
  SC_CLASS(LoadOrder(1000))
  SC_GENERATED_BODY()

  virtual sc_result InitializeImpl() override;
  virtual sc_result ShutdownImpl() override;

private:
  std::unique_ptr<ExamplePythonService> m_ExampleService;
};
