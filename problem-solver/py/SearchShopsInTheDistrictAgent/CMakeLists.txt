file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchShopsInTheDistrictModule SHARED ${SOURCES})

target_include_directories(SearchShopsInTheDistrictModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchShopsInTheDistrictModule sc-memory)

add_dependencies(SearchShopsInTheDistrictModule sc-memory)

sc_codegen(SearchShopsInTheDistrictModule ${CMAKE_CURRENT_LIST_DIR})
