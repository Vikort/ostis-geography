file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchShopsInTheCityModule SHARED ${SOURCES})

target_include_directories(SearchShopsInTheCityModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchShopsInTheCityModule sc-memory)

add_dependencies(SearchShopsInTheCityModule sc-memory)

sc_codegen(SearchShopsInTheCityModule ${CMAKE_CURRENT_LIST_DIR})
