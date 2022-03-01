file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchCinemasInTheDistrictModule SHARED ${SOURCES})

target_include_directories(SearchCinemasInTheDistrictModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchCinemasInTheDistrictModule sc-memory)

add_dependencies(SearchCinemasInTheDistrictModule sc-memory)

sc_codegen(SearchCinemasInTheDistrictModule ${CMAKE_CURRENT_LIST_DIR})
